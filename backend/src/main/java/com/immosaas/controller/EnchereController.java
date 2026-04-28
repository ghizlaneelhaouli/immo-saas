package com.immosaas.controller;

import com.immosaas.domain.User;
import com.immosaas.dto.request.PlaceOffreRequest;
import com.immosaas.dto.response.EnchereDTO;
import com.immosaas.service.EnchereService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/encheres")
@RequiredArgsConstructor
@Tag(name = "Enchères")
public class EnchereController {

    private final EnchereService enchereService;

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'une enchère")
    public ResponseEntity<EnchereDTO> getEnchere(@PathVariable Long id) {
        return ResponseEntity.ok(enchereService.getEnchere(id));
    }

    @GetMapping("/mes-encheres")
    @PreAuthorize("hasRole('ACHETEUR')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Liste des enchères de l'acheteur connecté")
    public ResponseEntity<List<EnchereDTO>> mesEncheres(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(enchereService.getMesEncheres(user.getId()));
    }

    @PostMapping("/{id}/inscrire")
    @PreAuthorize("hasRole('ACHETEUR')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "S'inscrire à une enchère")
    public ResponseEntity<String> inscrire(@PathVariable Long id,
                                           @AuthenticationPrincipal User user) {
        enchereService.inscrire(id, user.getId());
        return ResponseEntity.ok("Inscription à l'enchère confirmée");
    }

    @PostMapping("/{id}/offre")
    @PreAuthorize("hasRole('ACHETEUR')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Placer une offre sur une enchère")
    public ResponseEntity<String> placerOffre(@PathVariable Long id,
                                              @Valid @RequestBody PlaceOffreRequest request,
                                              @AuthenticationPrincipal User user) {
        enchereService.placerOffre(id, request.getMontant(), user.getId());
        return ResponseEntity.ok("Offre de " + request.getMontant() + " DH placée avec succès");
    }
}
