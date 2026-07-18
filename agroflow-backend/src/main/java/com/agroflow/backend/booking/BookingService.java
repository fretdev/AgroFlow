package com.agroflow.backend.booking;

import com.agroflow.backend.booking.dto.BookingResponse;
import com.agroflow.backend.crop.CropListing;
import com.agroflow.backend.crop.CropListingRepository;
import com.agroflow.backend.exception.CropAlreadyBookedException;
import com.agroflow.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final CropListingRepository cropListingRepository;
    private final BookingRepository bookingRepository;

    @Transactional
    public BookingResponse createBooking(Long cropId,Long buyerId){
        CropListing listing = cropListingRepository.findById(cropId).orElseThrow(()->
                new ResourceNotFoundException("Listing not found")
                );
        if(listing.isSold()){
            throw new CropAlreadyBookedException("This crop listing has already been booked by another user.");
        }
        listing.markAsSold();

        Booking booking = Booking.builder()
                .cropListing(listing)
                .buyerId(buyerId)
                .status(BookingStatus.PENDING)
                .build();
        Booking savedBooking = bookingRepository.save(booking);
        return BookingResponse.from(savedBooking);
    }
}
