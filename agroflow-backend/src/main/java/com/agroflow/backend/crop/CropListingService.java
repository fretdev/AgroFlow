package com.agroflow.backend.crop;

import com.agroflow.backend.crop.dto.CropListingRequest;
import com.agroflow.backend.crop.dto.CropListingResponse;
import com.agroflow.backend.crop.dto.UpdateCropListingRequest;
import com.agroflow.backend.exception.ResourceNotFoundException;
import com.agroflow.backend.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CropListingService {
    private final UserRepository userRepository;
    private final CropListingRepository cropListingRepository;
    @Transactional
    public CropListingResponse createCropListing(CropListingRequest request, Long farmerId){
        var farmer = userRepository.findById(farmerId).orElseThrow(()->new ResourceNotFoundException("Farmer not found"));

        if(cropListingRepository.existsByFarmerIdAndCropNameAndIsSoldFalse(farmerId,request.cropName())){
            throw new IllegalStateException("YOu already have an active listing for " + request.cropName() + ".Please update the existing listing instead.");
        }
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
    @Transactional
    public CropListingResponse updateCropListing(UpdateCropListingRequest request, Long farmerId,Long listingId){
        CropListing existingCropListing = cropListingRepository.findById(listingId).orElseThrow(()->new ResourceNotFoundException("Listing not found with id: "+ listingId));
        if(!existingCropListing.getFarmer().getId().equals(farmerId)){
            throw new AccessDeniedException("You are not authorized to update this listing");
        }
        existingCropListing.updateDetails(
                request.cropName(),
                request.description(),
                request.category(),
                request.quantity(),
                request.pricePerUnit(),
                request.location()
        );
        return mapToResponse(existingCropListing);
    }
    @Transactional(readOnly = true)
    public Page<CropListingResponse> getAllActiveCrops(Pageable pageable){
        return cropListingRepository.findByIsSoldFalse(pageable).map(this::mapToResponse);
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
