package com.immosaas.repository;

import com.immosaas.domain.Enchere;
import com.immosaas.domain.enums.EnchereStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EnchereRepository extends JpaRepository<Enchere, Long> {
    List<Enchere> findByStatutAndDateFinBefore(EnchereStatus statut, LocalDateTime dateFin);
    Optional<Enchere> findByProduitId(Long produitId);
}
