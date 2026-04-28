package com.immosaas.service;

import com.immosaas.domain.Product;
import com.immosaas.domain.User;

public interface PaiementService {
    void creerPaiementFrais(Product produit, User vendeur);
    boolean fraisDejaPayes(Long produitId);
}
