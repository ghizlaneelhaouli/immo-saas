package com.immosaas.service;

import com.immosaas.dto.response.EnchereDTO;

import java.math.BigDecimal;
import java.util.List;

public interface EnchereService {
    void inscrire(Long enchereId, Long acheteurId);
    void placerOffre(Long enchereId, BigDecimal montant, Long acheteurId);
    EnchereDTO getEnchere(Long enchereId);
    List<EnchereDTO> getMesEncheres(Long acheteurId);
    void cloturerEncheresExpirees();
}
