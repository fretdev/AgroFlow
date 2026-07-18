package com.agroflow.backend.booking.dto;


import jakarta.validation.constraints.NotNull;

public record BookingRequest(
    @NotNull(message = "Crop Listing ID  is required")
    Long cropListingId,

    @NotNull(message = "Buyer ID is required")
    Long buyerId
){}