package com.immosaas.service;

import com.immosaas.domain.Enchere;
import com.immosaas.domain.User;

import java.math.BigDecimal;

public interface EmailService {
    void sendWelcomeEmail(User user);
    void sendValidationEmail(User vendeur, boolean approuve, String motif);
    void sendNouvelleOffreEmail(Enchere enchere, BigDecimal montant);
    void sendCloturEmail(User gagnant, User vendeur, Enchere enchere);
}
