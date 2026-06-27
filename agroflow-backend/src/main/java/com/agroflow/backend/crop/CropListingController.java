package com.agroflow.backend.crop;

import com.agroflow.backend.crop.dto.CropListingRequest;
import com.agroflow.backend.crop.dto.CropListingResponse;
import com.agroflow.backend.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("api/v1/crops")
@RequiredArgsConstructor
public class CropListingController {
    private final CropListingService cropListingService;

    @PostMapping
    public ResponseEntity<CropListingResponse> createCrop(@Valid @RequestBody CropListingRequest request, Authentication authentication){
        if(authentication == null || authentication.getPrincipal() == null){
            return ResponseEntity.status(401).build();
        }
        User currentUser = (User) authentication.getPrincipal();
        long farmerId = currentUser.getId();
        CropListingResponse response = cropListingService.createCropListing(request,farmerId);
        return ResponseEntity.ok(response);
    }
}
