package com.immosaas.repository;

import com.immosaas.domain.Offre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OffreRepository extends JpaRepository<Offre, Long> {
    Optional<Offre> findTopByEnchereIdOrderByMontantDesc(Long enchereId);
}
