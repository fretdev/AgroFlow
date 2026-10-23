package com.agroflow.backend.booking;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByBuyerId(Long buyerId);

    List<Booking> findByStatus(BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.status = 'PENDING' AND b.expiresAt <= :now AND b.id > :lastId ORDER BY b.id ASC")
    List<Booking> findExpiredPendingBookingsKeyset(@Param("now") LocalDateTime now,@Param("lastId") Long lastId,Pageable pageable);
}
