package com.agroflow.backend.crop;

import com.agroflow.backend.crop.dto.CropListingRequest;
import com.agroflow.backend.crop.dto.CropListingResponse;
import com.agroflow.backend.exception.ResourceNotFoundException;
import com.agroflow.backend.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CropListingService {
    private final UserRepository userRepository;
    private final CropListingRepository cropListingRepository;
    @Transactional
    public CropListingResponse createCropListing(CropListingRequest request, Long farmerId){
        var farmer = userRepository.findById(farmerId).orElseThrow(()->new ResourceNotFoundException("Farmer not found"));

        CropListing listing = CropListing.builder()
                .cropName(request.cropName())
                .description(request.description())
                .category(request.category())
                .quantity(request.quantity())
                .pricePerUnit(request.pricePerUnit())
                .location(request.location())
                .farmer(farmer)
                .createdAt(LocalDateTime.now())
                .isActive(true)
                .isSold(false)
                .build();
        CropListing savedListing = cropListingRepository.save(listing);
        return mapToResponse(savedListing);
    }

    private CropListingResponse mapToResponse(CropListing entity) {
        return new CropListingResponse(
                entity.getId(),
                entity.getCropName(),
                entity.getDescription(),
                entity.getCategory(),
                entity.getQuantity(),
                entity.getPricePerUnit(),
                entity.getLocation(),
                entity.isSold(),
                entity.getCreatedAt(),
                entity.getFarmer().getFullName()
        );
    }
}
