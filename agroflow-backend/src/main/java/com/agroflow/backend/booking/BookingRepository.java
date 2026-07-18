package com.agroflow.backend.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByBuyerId(Long buyerId);

    List<Booking> findByStatus(BookingStatus status);
}
