package com.immosaas.service.impl;

import com.immosaas.domain.PaiementInscription;
import com.immosaas.domain.Product;
import com.immosaas.domain.User;
import com.immosaas.repository.PaiementInscriptionRepository;
import com.immosaas.service.PaiementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaiementServiceImpl implements PaiementService {

    private final PaiementInscriptionRepository paiementRepository;

    @Override
    @Transactional
    public void creerPaiementFrais(Product produit, User vendeur) {
        PaiementInscription paiement = PaiementInscription.builder()
                .produit(produit)
                .vendeur(vendeur)
                .build();
        paiementRepository.save(paiement);
        log.info("Frais d'inscription enregistrés pour le produit id={}", produit.getId());
    }

    @Override
    public boolean fraisDejaPayes(Long produitId) {
        return paiementRepository.existsByProduitId(produitId);
    }
}
