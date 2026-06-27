package com.agroflow.backend.crop.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CropListingResponse (
     Long id,
     String cropName,
     String description,
     String category,
     int quantity,
     BigDecimal pricePerUnit,
     String location,
     boolean isSold,
     LocalDateTime createdAt,
     String farmerName
){}
