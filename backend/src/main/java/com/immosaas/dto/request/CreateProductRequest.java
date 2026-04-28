package com.immosaas.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateProductRequest {

    @NotBlank
    private String titre;

    private String description;

    @NotNull
    @DecimalMin(value = "1.00", message = "Le prix de base doit être supérieur à 0")
    private BigDecimal prixBase;
}
