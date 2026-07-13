package com.agroflow.backend.specification;

import com.agroflow.backend.crop.CropListing;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class CropSpecifications {
    public static Specification<CropListing> withFilters(String cropName,Double minPrice,Double maxPrice,String location){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if(cropName != null && !cropName.isEmpty()){
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("cropName")),
                        "%" + cropName.trim().toLowerCase() + "%"
                ));
            }
            if(minPrice != null){
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"),minPrice));
            }
            if(maxPrice != null){
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"),maxPrice));
            }
            if(location != null && !location.isEmpty()){
                predicates.add(criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("location")),
                        location.trim().toLowerCase()
                ));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
