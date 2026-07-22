package com.agroflow.backend.booking;

import com.agroflow.backend.crop.CropListing;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "crop_listing_id",nullable = false)
    private CropListing cropListing;

    @Column(name = "buyer_id", nullable = false)
    private Long buyerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,length = 32)
    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;

    @Column(name = "expires_at",nullable = false)
    private LocalDateTime expiresAt;

    @CreationTimestamp
    @Column(name = "created_at",nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at",nullable = false)
    private LocalDateTime updatedAt;

    @Version
    @Column(nullable = false)
    @Builder.Default
    private Long version = 0L;

    public void cancel(){
        if (this.status == BookingStatus.COMPLETED || this.status == BookingStatus.DELIVERED){
            throw new IllegalStateException("Cannot cancel a booking that has already been completed or delivered.");
        }
        this.status = BookingStatus.CANCELLED;
    }
    public void confirm(){
        if(this.status != BookingStatus.PENDING){
            throw new IllegalStateException("Only pending bookings can be confirmed.");
        }
        this.status = BookingStatus.CONFIRMED;
    }
}


