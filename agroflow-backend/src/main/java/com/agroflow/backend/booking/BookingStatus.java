package com.agroflow.backend.booking;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BookingStatus {
    PENDING("Awaiting confirmation or payment initialization"),
    CONFIRMED("Booking confirmed and locked for processing"),
    EXPIRED("Booking automatically expired due to timeout threholds"),
    IN_TRANSIT("Agricultural produce is currently in transit"),
    DELIVERED("Produce has been successfully delivered"),
    COMPLETED("Order fulfilment and transaction completed successfully"),
    CANCELLED("Booking was cancelled by the user or system");

    private final String description;
}
