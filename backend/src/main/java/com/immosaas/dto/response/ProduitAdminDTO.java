package com.immosaas.dto.response;

import com.immosaas.domain.enums.ProductStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProduitAdminDTO {
    private Long id;
    private String titre;
    private String description;
    private BigDecimal prixBase;
    private List<String> images;
    private ProductStatus statut;
    private String motifRejet;
    private boolean fraisPayes;
    private LocalDateTime dateCreation;
    // Infos vendeur visibles pour l'admin uniquement
    private Long vendeurId;
    private String vendeurNom;
    private String vendeurEmail;
}
