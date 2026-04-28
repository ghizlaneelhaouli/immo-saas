package com.immosaas.controller;

import com.immosaas.dto.response.ProduitAdminDTO;
import com.immosaas.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "bearerAuth")
@RequiredArgsConstructor
@Tag(name = "Administration")
public class AdminController {

    private final ProductService productService;

    @GetMapping("/produits/en-attente")
    @Operation(summary = "Lister les produits en attente de validation")
    public ResponseEntity<List<ProduitAdminDTO>> produitsEnAttente() {
        return ResponseEntity.ok(productService.getProduitsEnAttente());
    }

    @PatchMapping("/produits/{id}/statut")
    @Operation(summary = "Approuver ou rejeter un produit")
    public ResponseEntity<String> validerProduit(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String decision = body.get("decision");
        String motif = body.getOrDefault("motif", "");

        if (decision == null || (!decision.equalsIgnoreCase("APPROUVER") && !decision.equalsIgnoreCase("REJETER"))) {
            return ResponseEntity.badRequest().body("La décision doit être APPROUVER ou REJETER");
        }

        productService.valider(id, decision, motif, null);
        return ResponseEntity.ok("Produit " + decision.toLowerCase() + " avec succès");
    }
}
