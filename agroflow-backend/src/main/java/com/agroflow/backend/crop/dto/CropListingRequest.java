package com.agroflow.backend.crop.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record CropListingRequest (
    @NotBlank(message = "Crop name is required")
    @Size(max = 100,message = "Crop name cannot exceed 100 characters")
    String cropName,

    @NotBlank(message = "Description is required")
    String description,

    @NotBlank(message = "Category is required")
    String category,

    @Min(value = 1,message = "Quantity must be at least 1")
    Integer quantity,

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01",message = "Price must be greater than zero")
    BigDecimal pricePerUnit,

    @NotBlank(message = "Location is required")
    String location
){}
