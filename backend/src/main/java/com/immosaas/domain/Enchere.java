package com.immosaas.domain;

import com.immosaas.domain.enums.EnchereStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "encheres")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Enchere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produit_id", nullable = false, unique = true)
    private Product produit;

    @Column(nullable = false)
    private LocalDateTime dateDebut;

    @Column(nullable = false)
    private LocalDateTime dateFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EnchereStatus statut = EnchereStatus.EN_COURS;

    @OneToMany(mappedBy = "enchere", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Offre> offres = new ArrayList<>();

    @OneToMany(mappedBy = "enchere", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Participation> participations = new ArrayList<>();
}
