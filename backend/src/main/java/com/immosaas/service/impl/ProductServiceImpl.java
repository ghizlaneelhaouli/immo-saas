package com.immosaas.service.impl;

import com.immosaas.domain.Enchere;
import com.immosaas.domain.Product;
import com.immosaas.domain.User;
import com.immosaas.domain.enums.EnchereStatus;
import com.immosaas.domain.enums.ProductStatus;
import com.immosaas.dto.request.CreateProductRequest;
import com.immosaas.dto.response.EnchereDTO;
import com.immosaas.dto.response.ProduitAdminDTO;
import com.immosaas.dto.response.ProduitPublicDTO;
import com.immosaas.exception.BusinessException;
import com.immosaas.exception.ResourceNotFoundException;
import com.immosaas.repository.EnchereRepository;
import com.immosaas.repository.OffreRepository;
import com.immosaas.repository.ProductRepository;
import com.immosaas.repository.UserRepository;
import com.immosaas.service.EmailService;
import com.immosaas.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final EnchereRepository enchereRepository;
    private final OffreRepository offreRepository;
    private final EmailService emailService;

    @Value("${app.frais-inscription.seuil-prix:500}")
    private BigDecimal seuilPrix;

    @Value("${app.enchere.duree-jours:7}")
    private int dureeJours;

    @Value("${app.upload-dir:uploads}")
    private String uploadDir;

    @Override
    @Transactional
    public Long soumettre(CreateProductRequest request, List<MultipartFile> images, Long vendeurId) {
        User vendeur = userRepository.findById(vendeurId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendeur introuvable"));

        List<String> imageUrls = new ArrayList<>();
        if (images != null) {
            File dir = new File(uploadDir).getAbsoluteFile();
            dir.mkdirs();
            for (MultipartFile file : images) {
                if (!file.isEmpty()) {
                    String ext = "";
                    String original = file.getOriginalFilename();
                    if (original != null && original.contains(".")) {
                        ext = original.substring(original.lastIndexOf("."));
                    }
                    String filename = UUID.randomUUID() + ext;
                    try {
                        file.transferTo(new File(dir, filename));
                        imageUrls.add("/uploads/" + filename);
                    } catch (IOException e) {
                        log.warn("Échec sauvegarde image {} : {}", filename, e.getMessage());
                    }
                }
            }
        }

        Product produit = Product.builder()
                .titre(request.getTitre())
                .description(request.getDescription())
                .prixBase(request.getPrixBase())
                .images(imageUrls)
                .statut(ProductStatus.EN_ATTENTE)
                .vendeur(vendeur)
                .fraisPayes(!necessitePaiement(request))
                .build();

        productRepository.save(produit);
        log.info("Produit soumis id={} par vendeur id={}", produit.getId(), vendeurId);
        return produit.getId();
    }

    @Override
    public boolean necessitePaiement(CreateProductRequest request) {
        return request.getPrixBase().compareTo(seuilPrix) > 0;
    }

    @Override
    @Transactional
    public void valider(Long produitId, String decision, String motif, Long adminId) {
        Product produit = productRepository.findById(produitId)
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable id=" + produitId));

        if (produit.getStatut() != ProductStatus.EN_ATTENTE) {
            throw new BusinessException("Ce produit a déjà été traité");
        }

        boolean approuve = "APPROUVER".equalsIgnoreCase(decision);

        if (approuve) {
            produit.setStatut(ProductStatus.ACTIF);
            produit.setDateValidation(LocalDateTime.now());
            productRepository.save(produit);

            LocalDateTime debut = LocalDateTime.now();
            Enchere enchere = Enchere.builder()
                    .produit(produit)
                    .dateDebut(debut)
                    .dateFin(debut.plusDays(dureeJours))
                    .statut(EnchereStatus.EN_COURS)
                    .build();
            enchereRepository.save(enchere);
            log.info("Produit id={} approuvé, enchère créée id={}", produitId, enchere.getId());
        } else {
            produit.setStatut(ProductStatus.REJETE);
            produit.setMotifRejet(motif);
            productRepository.save(produit);
            log.info("Produit id={} rejeté. Motif: {}", produitId, motif);
        }

        emailService.sendValidationEmail(produit.getVendeur(), approuve, motif);
    }

    @Override
    public Page<ProduitPublicDTO> getCatalogue(Pageable pageable) {
        return productRepository.findByStatut(ProductStatus.ACTIF, pageable)
                .map(this::toPublicDTO);
    }

    @Override
    public ProduitPublicDTO getPublicDetail(Long produitId) {
        Product produit = productRepository.findById(produitId)
                .orElseThrow(() -> new ResourceNotFoundException("Produit introuvable id=" + produitId));
        return toPublicDTO(produit);
    }

    @Override
    public List<ProduitAdminDTO> getProduitsEnAttente() {
        return productRepository.findByStatut(ProductStatus.EN_ATTENTE).stream()
                .map(this::toAdminDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProduitPublicDTO> getMesProduits(Long vendeurId) {
        return productRepository.findByVendeurId(vendeurId).stream()
                .map(this::toPublicDTO)
                .collect(Collectors.toList());
    }

    private ProduitPublicDTO toPublicDTO(Product p) {
        return enchereRepository.findByProduitId(p.getId()).map(enchere -> {
            BigDecimal meilleureOffre = offreRepository
                    .findTopByEnchereIdOrderByMontantDesc(enchere.getId())
                    .map(o -> o.getMontant())
                    .orElse(null);
            return ProduitPublicDTO.builder()
                    .id(p.getId())
                    .titre(p.getTitre())
                    .description(p.getDescription())
                    .prixBase(p.getPrixBase())
                    .images(p.getImages())
                    .dateFinEnchere(enchere.getDateFin())
                    .meilleureOffre(meilleureOffre)
                    .nombreParticipants(enchere.getParticipations().size())
                    .statutEnchere(enchere.getStatut())
                    .build();
        }).orElse(ProduitPublicDTO.builder()
                .id(p.getId())
                .titre(p.getTitre())
                .description(p.getDescription())
                .prixBase(p.getPrixBase())
                .images(p.getImages())
                .build());
    }

    private ProduitAdminDTO toAdminDTO(Product p) {
        return ProduitAdminDTO.builder()
                .id(p.getId())
                .titre(p.getTitre())
                .description(p.getDescription())
                .prixBase(p.getPrixBase())
                .images(p.getImages())
                .statut(p.getStatut())
                .motifRejet(p.getMotifRejet())
                .fraisPayes(p.isFraisPayes())
                .dateCreation(p.getDateCreation())
                .vendeurId(p.getVendeur().getId())
                .vendeurNom(p.getVendeur().getNom())
                .vendeurEmail(p.getVendeur().getEmail())
                .build();
    }
}
