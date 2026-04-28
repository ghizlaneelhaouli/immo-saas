package com.immosaas.service.impl;

import com.immosaas.domain.Enchere;
import com.immosaas.domain.User;
import com.immosaas.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    @Async
    public void sendWelcomeEmail(User user) {
        send(user.getEmail(),
                "Bienvenue sur IMMO SAAS",
                "Bonjour " + user.getNom() + ",\n\nVotre compte a été créé avec succès.\n\nL'équipe IMMO SAAS");
    }

    @Override
    @Async
    public void sendValidationEmail(User vendeur, boolean approuve, String motif) {
        String sujet = approuve ? "Votre produit a été approuvé" : "Votre produit a été rejeté";
        String corps = approuve
                ? "Bonjour " + vendeur.getNom() + ",\n\nVotre produit a été approuvé et mis en enchère."
                : "Bonjour " + vendeur.getNom() + ",\n\nVotre produit a été rejeté.\nMotif : " + motif;
        send(vendeur.getEmail(), sujet, corps);
    }

    @Override
    @Async
    public void sendNouvelleOffreEmail(Enchere enchere, BigDecimal montant) {
        User vendeur = enchere.getProduit().getVendeur();
        send(vendeur.getEmail(),
                "Nouvelle offre sur votre produit",
                "Une nouvelle offre de " + montant + " DH a été placée sur : " + enchere.getProduit().getTitre());
    }

    @Override
    @Async
    public void sendCloturEmail(User gagnant, User vendeur, Enchere enchere) {
        String produit = enchere.getProduit().getTitre();
        if (gagnant != null) {
            send(gagnant.getEmail(),
                    "Félicitations ! Vous avez remporté l'enchère",
                    "Vous avez remporté l'enchère pour : " + produit + "\nContactez le vendeur pour finaliser la transaction.");
            send(vendeur.getEmail(),
                    "Votre enchère est terminée",
                    "L'enchère pour " + produit + " est terminée. L'acheteur gagnant vous contactera prochainement.");
        } else {
            send(vendeur.getEmail(),
                    "Enchère terminée sans offre",
                    "L'enchère pour " + produit + " s'est terminée sans aucune offre.");
        }
    }

    private void send(String to, String subject, String text) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(text);
            mailSender.send(msg);
            log.info("Email envoyé à {}", to);
        } catch (Exception e) {
            log.warn("Échec envoi email à {} : {}", to, e.getMessage());
        }
    }
}
