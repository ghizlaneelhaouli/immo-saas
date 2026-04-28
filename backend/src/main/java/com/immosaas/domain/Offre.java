package com.immosaas.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "offres")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Offre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enchere_id", nullable = false)
    private Enchere enchere;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acheteur_id", nullable = false)
    private User acheteur;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal montant;

    @Builder.Default
    private LocalDateTime dateOffre = LocalDateTime.now();
}
