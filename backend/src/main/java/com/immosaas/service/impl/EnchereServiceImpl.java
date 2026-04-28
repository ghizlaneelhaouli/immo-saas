package com.immosaas.service.impl;

import com.immosaas.domain.*;
import com.immosaas.domain.enums.EnchereStatus;
import com.immosaas.dto.response.EnchereDTO;
import com.immosaas.exception.BusinessException;
import com.immosaas.exception.ResourceNotFoundException;
import com.immosaas.repository.*;
import com.immosaas.service.EmailService;
import com.immosaas.service.EnchereService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EnchereServiceImpl implements EnchereService {

    private final EnchereRepository enchereRepository;
    private final ParticipationRepository participationRepository;
    private final OffreRepository offreRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    @Transactional
    public void inscrire(Long enchereId, Long acheteurId) {
        Enchere enchere = getEnchereOuErreur(enchereId);

        if (enchere.getStatut() != EnchereStatus.EN_COURS) {
            throw new BusinessException("Cette enchère n'est plus active");
        }
        if (participationRepository.existsByEnchereIdAndAcheteurId(enchereId, acheteurId)) {
            throw new BusinessException("Vous êtes déjà inscrit à cette enchère");
        }

        User acheteur = userRepository.findById(acheteurId)
                .orElseThrow(() -> new ResourceNotFoundException("Acheteur introuvable"));

        Participation participation = Participation.builder()
                .enchere(enchere)
                .acheteur(acheteur)
                .build();
        participationRepository.save(participation);
        log.info("Acheteur id={} inscrit à l'enchère id={}", acheteurId, enchereId);
    }

    @Override
    @Transactional
    public void placerOffre(Long enchereId, BigDecimal montant, Long acheteurId) {
        Enchere enchere = getEnchereOuErreur(enchereId);

        if (enchere.getStatut() != EnchereStatus.EN_COURS) {
            throw new BusinessException("Cette enchère n'est plus active");
        }
        if (!participationRepository.existsByEnchereIdAndAcheteurId(enchereId, acheteurId)) {
            throw new BusinessException("Vous devez vous inscrire à l'enchère avant de placer une offre");
        }

        BigDecimal prixBase = enchere.getProduit().getPrixBase();
        if (montant.compareTo(prixBase) <= 0) {
            throw new BusinessException("L'offre doit être supérieure au prix de base : " + prixBase + " DH");
        }

        offreRepository.findTopByEnchereIdOrderByMontantDesc(enchereId).ifPresent(meilleureOffre -> {
            if (montant.compareTo(meilleureOffre.getMontant()) <= 0) {
                throw new BusinessException("L'offre doit être supérieure à la meilleure offre actuelle : "
                        + meilleureOffre.getMontant() + " DH");
            }
        });

        User acheteur = userRepository.findById(acheteurId)
                .orElseThrow(() -> new ResourceNotFoundException("Acheteur introuvable"));

        Offre offre = Offre.builder()
                .enchere(enchere)
                .acheteur(acheteur)
                .montant(montant)
                .build();
        offreRepository.save(offre);

        // Broadcast WebSocket : informe tous les clients abonnés
        messagingTemplate.convertAndSend("/topic/encheres/" + enchereId,
                new EnchereDTO.OffreDTO(montant, offre.getDateOffre()));

        emailService.sendNouvelleOffreEmail(enchere, montant);
        log.info("Offre de {} DH placée par acheteur id={} sur enchère id={}", montant, acheteurId, enchereId);
    }

    @Override
    public EnchereDTO getEnchere(Long enchereId) {
        return toDTO(getEnchereOuErreur(enchereId));
    }

    @Override
    public List<EnchereDTO> getMesEncheres(Long acheteurId) {
        return participationRepository.findByAcheteurId(acheteurId).stream()
                .map(p -> toDTO(p.getEnchere()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void cloturerEncheresExpirees() {
        List<Enchere> expirees = enchereRepository.findByStatutAndDateFinBefore(
                EnchereStatus.EN_COURS, LocalDateTime.now());

        for (Enchere enchere : expirees) {
            enchere.setStatut(EnchereStatus.TERMINEE);
            enchereRepository.save(enchere);

            offreRepository.findTopByEnchereIdOrderByMontantDesc(enchere.getId()).ifPresentOrElse(
                    meilleureOffre -> {
                        emailService.sendCloturEmail(
                                meilleureOffre.getAcheteur(),
                                enchere.getProduit().getVendeur(),
                                enchere);
                        log.info("Enchère id={} clôturée, gagnant id={}", enchere.getId(),
                                meilleureOffre.getAcheteur().getId());
                    },
                    () -> {
                        emailService.sendCloturEmail(null, enchere.getProduit().getVendeur(), enchere);
                        log.info("Enchère id={} clôturée sans offre", enchere.getId());
                    }
            );
        }
        log.info("{} enchère(s) clôturée(s)", expirees.size());
    }

    private Enchere getEnchereOuErreur(Long enchereId) {
        return enchereRepository.findById(enchereId)
                .orElseThrow(() -> new ResourceNotFoundException("Enchère introuvable id=" + enchereId));
    }

    private EnchereDTO toDTO(Enchere enchere) {
        BigDecimal meilleureOffre = offreRepository
                .findTopByEnchereIdOrderByMontantDesc(enchere.getId())
                .map(Offre::getMontant)
                .orElse(null);

        List<EnchereDTO.OffreDTO> offresDTO = enchere.getOffres().stream()
                .map(o -> EnchereDTO.OffreDTO.builder()
                        .montant(o.getMontant())
                        .dateOffre(o.getDateOffre())
                        .build())
                .collect(Collectors.toList());

        return EnchereDTO.builder()
                .id(enchere.getId())
                .produitId(enchere.getProduit().getId())
                .produitTitre(enchere.getProduit().getTitre())
                .prixBase(enchere.getProduit().getPrixBase())
                .dateDebut(enchere.getDateDebut())
                .dateFin(enchere.getDateFin())
                .statut(enchere.getStatut())
                .meilleureOffre(meilleureOffre)
                .nombreParticipants(enchere.getParticipations().size())
                .offres(offresDTO)
                .build();
    }
}
