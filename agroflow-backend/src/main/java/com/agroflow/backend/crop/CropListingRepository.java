package com.agroflow.backend.crop;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface CropListingRepository extends JpaRepository<CropListing,Long>, JpaSpecificationExecutor<CropListing> {

    List<CropListing> findAllByFarmerId(Long farmerId);

    List<CropListing> findAllByCategoryAndIsActiveTrue(String category);

    boolean existsByFarmerIdAndCropNameAndIsSoldFalse(Long farmerId,String cropName);

    Page<CropListing> findByIsSoldFalse(Pageable pageable);

    Page<CropListing> findAllByFarmerId(Long farmerId,Pageable pageable);

    boolean existsByFarmerId(Long farmerId);

    boolean existsByIdAndFarmerId(Long id,Long farmerId);


    @Query("SELECT c FROM CropListing c WHERE c.id = :id")
    Optional<CropListing> findByIdWithLock(Long id);

    @Modifying
    @Query("UPDATE CropListing c SET c.isSold = true WHERE c.id = :id AND c.isSold = false")
    int markAsSoldIfAvailable(@Param("id") Long id);
}
