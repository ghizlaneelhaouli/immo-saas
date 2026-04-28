package com.immosaas.dto.response;

import com.immosaas.domain.enums.EnchereStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

// Pas de champ vendeur — anonymat garanti (RGPD)
@Data
@Builder
public class ProduitPublicDTO {
    private Long id;
    private String titre;
    private String description;
    private BigDecimal prixBase;
    private List<String> images;
    private LocalDateTime dateFinEnchere;
    private BigDecimal meilleureOffre;
    private int nombreParticipants;
    private EnchereStatus statutEnchere;
}
