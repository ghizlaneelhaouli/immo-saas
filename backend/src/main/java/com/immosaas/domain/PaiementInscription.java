package com.immosaas.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "paiements_inscription")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaiementInscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produit_id")
    private Product produit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendeur_id")
    private User vendeur;

    @Builder.Default
    @Column(precision = 10, scale = 2)
    private BigDecimal montant = BigDecimal.valueOf(20);

    @Builder.Default
    private String statut = "PAYE";

    @Builder.Default
    private LocalDateTime datePaiement = LocalDateTime.now();
}
