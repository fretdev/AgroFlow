package com.agroflow.backend.crop;

import com.agroflow.backend.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "crop_listings")
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class CropListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id",nullable = false)
    private User farmer;

    @Column(name = "crop_name",nullable = false)
    private String cropName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "price_per_unit",nullable = false,precision = 19,scale = 2)
    private BigDecimal pricePerUnit;

    @Column(nullable = false)
    private String location;

    @Builder.Default
    @Column(name = "is_active",nullable = false)
    private boolean isActive = true;

    @Builder.Default
    @Column(name = "is_sold",nullable = false)
    private boolean isSold = false;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    public void updateDetails(String cropName, String description, String category, Integer quantity, BigDecimal pricePerUnit,String location){
        this.cropName = cropName;
        this.description = description;
        this.category = category;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.location = location;
    }
}
