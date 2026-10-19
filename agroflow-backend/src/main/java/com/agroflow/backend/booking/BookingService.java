package com.agroflow.backend.booking;

import com.agroflow.backend.booking.dto.BookingResponse;
import com.agroflow.backend.crop.CropListing;
import com.agroflow.backend.crop.CropListingRepository;
import com.agroflow.backend.exception.CropAlreadyBookedException;
import com.agroflow.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingService {
    private static final int BOOKING_EXPIRATION_MINUTES = 15;
    private final CropListingRepository cropListingRepository;
    private final BookingRepository bookingRepository;


    @Transactional()
    public BookingResponse createBooking(Long cropId,Long buyerId){
            int updatedRows = cropListingRepository.markAsSoldIfAvailable(cropId);

            if(updatedRows == 0){
                throw new CropAlreadyBookedException("This crop listing has already been booked by another user.");
            }
            CropListing listing = cropListingRepository.findById(cropId).orElseThrow(() ->
                    new ResourceNotFoundException("Listing not found")
            );

            Booking booking = Booking.builder()
                    .cropListing(listing)
                    .buyerId(buyerId)
                    .status(BookingStatus.PENDING)
                    .expiresAt(LocalDateTime.now().plusMinutes(BOOKING_EXPIRATION_MINUTES))
                    .build();
            Booking savedBooking = bookingRepository.save(booking);
            return BookingResponse.from(savedBooking);

    }
    @Transactional
    public void cancelBooking(Long bookingId,Long buyerId){
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(()->new ResourceNotFoundException("Booking not found"));
        if(!booking.getBuyerId().equals(buyerId)){
            throw  new IllegalStateException("Unauthorized to cancel this booking");
        }
        booking.cancel();
        bookingRepository.save(booking);
        int updatedRows = cropListingRepository.markAsAvailable(booking.getCropListing().getId());
        if(updatedRows == 0){
            log.warn("Crop listing ID {} was already marked as available or not found during cancellation of booking ID {}",booking.getCropListing().getId(),bookingId);

        }else{
            log.info("Successfully canceled booking ID {} and realesed crop listing ID {}",bookingId,booking.getCropListing().getId());
        }
    }
}
