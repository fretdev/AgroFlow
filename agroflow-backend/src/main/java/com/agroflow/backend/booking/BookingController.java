package com.agroflow.backend.booking;

import com.agroflow.backend.booking.dto.BookingRequest;
import com.agroflow.backend.booking.dto.BookingResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping("/bookings")
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request){
        BookingResponse response = bookingService.createBooking(request.cropListingId(),request.buyerId());
        return ResponseEntity.ok(response);
    }
}
