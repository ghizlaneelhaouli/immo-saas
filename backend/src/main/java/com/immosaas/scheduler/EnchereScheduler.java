package com.immosaas.scheduler;

import com.immosaas.service.EnchereService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class EnchereScheduler {

    private final EnchereService enchereService;

    // Vérifie toutes les heures les enchères expirées
    @Scheduled(fixedRate = 3_600_000)
    public void cloturerEncheres() {
        log.info("Vérification des enchères expirées...");
        enchereService.cloturerEncheresExpirees();
    }
}
