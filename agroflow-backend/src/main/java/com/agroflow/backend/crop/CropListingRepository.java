package com.agroflow.backend.crop;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CropListingRepository extends JpaRepository<CropListing,Long> {

    List<CropListing> findAllByFarmerId(Long farmerId);

    List<CropListing> findAllByCategoryAndIsActiveTrue(String category);

    boolean existsByFarmerIdAndCropNameAndIsSoldFalse(Long farmerId,String cropName);

    Page<CropListing> findByIsSoldFalse(Pageable pageable);
}
