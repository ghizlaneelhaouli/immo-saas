package com.immosaas.service;

import com.immosaas.dto.request.CreateProductRequest;
import com.immosaas.dto.response.ProduitAdminDTO;
import com.immosaas.dto.response.ProduitPublicDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    Long soumettre(CreateProductRequest request, List<MultipartFile> images, Long vendeurId);
    boolean necessitePaiement(CreateProductRequest request);
    void valider(Long produitId, String decision, String motif, Long adminId);
    Page<ProduitPublicDTO> getCatalogue(Pageable pageable);
    ProduitPublicDTO getPublicDetail(Long produitId);
    List<ProduitAdminDTO> getProduitsEnAttente();
    List<ProduitPublicDTO> getMesProduits(Long vendeurId);
}
