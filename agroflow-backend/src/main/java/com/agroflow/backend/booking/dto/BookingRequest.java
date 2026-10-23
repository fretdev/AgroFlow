package com.agroflow.backend.booking.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record BookingRequest(
    @NotNull(message = "Crop Listing ID  is required")
    @Positive(message = "Crop Listing ID must be a valid positive number")
    Long cropListingId,

    @NotNull(message = "Buyer ID is required")
    @Positive(message = "Buyer ID must be a valid positive number")
    Long buyerId
){}