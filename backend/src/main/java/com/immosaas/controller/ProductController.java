package com.immosaas.controller;

import com.immosaas.domain.User;
import com.immosaas.dto.request.CreateProductRequest;
import com.immosaas.dto.response.ProduitPublicDTO;
import com.immosaas.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
@Tag(name = "Produits")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Catalogue public (sans infos vendeur)")
    public ResponseEntity<Page<ProduitPublicDTO>> catalogue(Pageable pageable) {
        return ResponseEntity.ok(productService.getCatalogue(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un produit")
    public ResponseEntity<ProduitPublicDTO> detail(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getPublicDetail(id));
    }

    @GetMapping("/mes-produits")
    @PreAuthorize("hasRole('VENDEUR')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Liste des produits du vendeur connecté")
    public ResponseEntity<List<ProduitPublicDTO>> mesProduits(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(productService.getMesProduits(user.getId()));
    }

    @PostMapping(value = "/soumettre", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('VENDEUR')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Soumettre un produit à la vente")
    public ResponseEntity<Map<String, Object>> soumettre(
            @Valid @RequestPart("request") CreateProductRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images,
            @AuthenticationPrincipal User user) {

        boolean necessite = productService.necessitePaiement(request);
        Long id = productService.soumettre(request, images, user.getId());

        return ResponseEntity.ok(Map.of(
                "produitId", id,
                "fraisNecessaires", necessite,
                "montantFrais", necessite ? 20 : 0,
                "message", "Produit soumis, en attente de validation admin"
        ));
    }
}
