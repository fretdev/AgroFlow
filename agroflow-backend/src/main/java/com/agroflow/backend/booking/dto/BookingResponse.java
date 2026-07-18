package com.agroflow.backend.booking.dto;

import com.agroflow.backend.booking.Booking;
import com.agroflow.backend.booking.BookingStatus;
import lombok.Builder;


import java.time.LocalDateTime;
@Builder
public record BookingResponse (
    Long id,
    Long cropListingId,
    BookingStatus status,
    Long buyerId,
    LocalDateTime createdAt
){
    public static BookingResponse from(Booking booking){
        return BookingResponse.builder()
                .id(booking.getId())
                .cropListingId(booking.getCropListing().getId())
                .buyerId(booking.getBuyerId())
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
