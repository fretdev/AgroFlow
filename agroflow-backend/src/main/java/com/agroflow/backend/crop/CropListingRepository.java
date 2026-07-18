package com.agroflow.backend.crop;

import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
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


    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM CropListing c WHERE c.id = :id")
    Optional<CropListing> findByIdWithLock(Long id);
}
