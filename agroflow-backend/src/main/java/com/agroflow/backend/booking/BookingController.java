package com.agroflow.backend.booking;

import com.agroflow.backend.booking.dto.BookingRequest;
import com.agroflow.backend.booking.dto.BookingResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request){
        BookingResponse response = bookingService.createBooking(request.cropListingId(),request.buyerId());
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{bookingId}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId,@RequestParam Long buyerId){
        bookingService.cancelBooking(bookingId,buyerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByBuyer(@PathVariable Long buyerId){
        List<BookingResponse> bookings = bookingService.getBookingsByBuyer(buyerId);
        return ResponseEntity.ok(bookings);
    }

    @PatchMapping("/{bookingId}/confirm")
    public ResponseEntity<Void> confirmBooking(@PathVariable Long bookingId,@RequestParam Long farmerId){
        bookingService.confirmBooking(bookingId,farmerId);
        return ResponseEntity.noContent().build();
    }
}
