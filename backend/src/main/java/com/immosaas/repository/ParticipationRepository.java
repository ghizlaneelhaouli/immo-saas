package com.immosaas.repository;

import com.immosaas.domain.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    boolean existsByEnchereIdAndAcheteurId(Long enchereId, Long acheteurId);
    List<Participation> findByAcheteurId(Long acheteurId);
}
