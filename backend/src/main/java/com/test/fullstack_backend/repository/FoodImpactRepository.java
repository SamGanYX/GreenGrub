package com.test.fullstack_backend.repository;

import com.test.fullstack_backend.model.FoodImpact;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodImpactRepository extends JpaRepository<FoodImpact, String> {
    Optional<FoodImpact> impactByGtin(String gtin);
}
