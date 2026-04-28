package com.immosaas.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "participations",
        uniqueConstraints = @UniqueConstraint(columnNames = {"enchere_id", "acheteur_id"}))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enchere_id", nullable = false)
    private Enchere enchere;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acheteur_id", nullable = false)
    private User acheteur;

    @Builder.Default
    private LocalDateTime dateInscription = LocalDateTime.now();
}
