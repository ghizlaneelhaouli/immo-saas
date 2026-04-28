package com.immosaas.repository;

import com.immosaas.domain.PaiementInscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaiementInscriptionRepository extends JpaRepository<PaiementInscription, Long> {
    boolean existsByProduitId(Long produitId);
}
