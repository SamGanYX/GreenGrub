package com.test.fullstack_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Barcode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String productName;
    private String barcode;
    private String ecoscoreGrade;
    private String ecoscoreScore;
    private String nutriscoreGrade;
    private String nutriscoreScore;
    private String energyKcal100g;
    private String sugars100g;
    private String proteins100g;

    // Getter for id
    public Long getId() {
        return id;
    }

    // Getter for userId
    public Long getUserId() {
        return userId;
    }

    // Setter for userId
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter for productName
    public String getProductName() {
        return productName;
    }

    // Setter for barcode
    public void setProductName(String productName) {
        this.productName = productName;
    }

    // Getter for barcode
    public String getBarcode() {
        return barcode;
    }

    // Setter for barcode
    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    // Getter for ecoscoreGrade
    public String getEcoscoreGrade() {
        return ecoscoreGrade;
    }

    // Setter for ecoscoreGrade
    public void setEcoscoreGrade(String ecoscoreGrade) {
        this.ecoscoreGrade = ecoscoreGrade;
    }

    // Getter for ecoscoreScore
    public String getEcoscoreScore() {
        return ecoscoreScore;
    }

    // Setter for ecoscoreScore
    public void setEcoscoreScore(String ecoscoreScore) {
        this.ecoscoreScore = ecoscoreScore;
    }

    // Getter for nutriscoreGrade
    public String getNutriscoreGrade() {
        return nutriscoreGrade;
    }

    // Setter for nutriscoreGrade
    public void setNutriscoreGrade(String nutriscoreGrade) {
        this.nutriscoreGrade = nutriscoreGrade;
    }

    // Getter for nutriscoreScore
    public String getNutriscoreScore() {
        return nutriscoreScore;
    }

    // Setter for nutriscoreScore
    public void setNutriscoreScore(String nutriscoreScore) {
        this.nutriscoreScore = nutriscoreScore;
    }

    // Getter for energyKcal100g
    public String getEnergyKcal100g() {
        return energyKcal100g;
    }

    // Setter for energyKcal100g
    public void setEnergyKcal100g(String energyKcal100g) {
        this.energyKcal100g = energyKcal100g;
    }

    // Getter for sugars100g
    public String getSugars100g() {
        return sugars100g;
    }

    // Setter for sugars100g
    public void setSugars100g(String sugars100g) {
        this.sugars100g = sugars100g;
    }

    // Getter for proteins100g
    public String getProteins100g() {
        return proteins100g;
    }

    // Setter for proteins100g
    public void setProteins100g(String proteins100g) {
        this.proteins100g = proteins100g;
    }
}
