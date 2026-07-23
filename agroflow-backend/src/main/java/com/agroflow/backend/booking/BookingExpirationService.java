package com.agroflow.backend.booking;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.data.domain.PageRequest;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingExpirationService {
    private final BookingRepository bookingRepository;

    private static final int BATCH_SIZE  = 500;

    @Scheduled(fixedDelay = 60000)
    @SchedulerLock(
            name = "processExpiredBooking_lock",
            lockAtLeastFor = "30s",
            lockAtMostFor = "10m"
    )
    public void processExpiredBooking(){
        LocalDateTime now = LocalDateTime.now();
        log.info("Initiating scheduled scan for expired pending booking {}",now);

        long lastId = 0L;
        int totalProcessed = 0;

        while (true){
            List<Booking> expiredPendingBookingsChunk = bookingRepository.findExpiredPendingBookingsKeyset(now,lastId,PageRequest.of(0,BATCH_SIZE));

            if (expiredPendingBookingsChunk.isEmpty()){
                log.debug("No expired bookings found during this execution cycle.");
                break;
            }
            processBatch(expiredPendingBookingsChunk);

            lastId = expiredPendingBookingsChunk.getLast().getId();
            totalProcessed += expiredPendingBookingsChunk.size();

            if (expiredPendingBookingsChunk.size() < BATCH_SIZE){
                break;
            }
        }

        log.info("Completed scheduled expiration processing cycle. Total processed: {}",totalProcessed);
    }

    @Transactional
    public void processBatch(List<Booking> bookings){
        for (Booking booking : bookings){
            try {
                booking.expire();
                bookingRepository.save(booking);
                log.info("Successfully transitioned booking ID {} to EXPIRED status.",booking.getId());
            }catch (Exception e){
                log.error("Failed to transition booking ID {} to EXPIRED status: {}",booking.getId(),e.getMessage(),e);
            }
        }
    }
}

