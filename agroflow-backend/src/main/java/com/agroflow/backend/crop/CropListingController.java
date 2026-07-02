package com.agroflow.backend.crop;

import com.agroflow.backend.crop.dto.CropListingRequest;
import com.agroflow.backend.crop.dto.CropListingResponse;
import com.agroflow.backend.crop.dto.UpdateCropListingRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1/crops")
@RequiredArgsConstructor
public class CropListingController {
    private final CropListingService cropListingService;

    @PostMapping
    public ResponseEntity<CropListingResponse> createCrop(@Valid @RequestBody CropListingRequest request, @AuthenticationPrincipal(expression = "id") Long farmerId){
        CropListingResponse response = cropListingService.createCropListing(request,farmerId);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{listingId}")
    public ResponseEntity<CropListingResponse> updateCrop(@PathVariable Long listingId , @Valid @RequestBody UpdateCropListingRequest request, @AuthenticationPrincipal(expression = "id") Long farmerId){
        CropListingResponse response = cropListingService.updateCropListing(request,farmerId,listingId);
        return  ResponseEntity.ok(response);
    }
    @GetMapping
    public ResponseEntity<Page<CropListingResponse>> getAllCrops(@PageableDefault(size = 10,sort = "createdAt",direction = Sort.Direction.DESC)Pageable pageable){
        Page<CropListingResponse> response = cropListingService.getAllActiveCrops(pageable);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/my-listings")
    public ResponseEntity<Page<CropListingResponse>> getAllFarmerCrops(@PageableDefault(size = 10,sort = "createdAt",direction = Sort.Direction.DESC)Pageable pageable,@AuthenticationPrincipal(expression = "id")Long farmerId){
        Page<CropListingResponse> response = cropListingService.getAllFarmerCropListing(pageable,farmerId);
        return ResponseEntity.ok(response);
    }
}
