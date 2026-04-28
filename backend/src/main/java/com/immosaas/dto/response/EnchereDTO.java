package com.immosaas.dto.response;

import com.immosaas.domain.enums.EnchereStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class EnchereDTO {
    private Long id;
    private Long produitId;
    private String produitTitre;
    private BigDecimal prixBase;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private EnchereStatus statut;
    private BigDecimal meilleureOffre;
    private int nombreParticipants;
    // Offres sans coordonnées acheteur — seulement montant et date
    private List<OffreDTO> offres;

    @Data
    @Builder
    public static class OffreDTO {
        private BigDecimal montant;
        private LocalDateTime dateOffre;
    }
}
