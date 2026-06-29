package com.agroflow.backend.crop;

import com.agroflow.backend.crop.dto.CropListingRequest;
import com.agroflow.backend.crop.dto.CropListingResponse;
import com.agroflow.backend.crop.dto.UpdateCropListingRequest;
import com.agroflow.backend.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
}
