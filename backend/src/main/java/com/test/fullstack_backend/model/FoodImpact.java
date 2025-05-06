package com.test.fullstack_backend.model;

import jakarta.persistence.Entity;

@Entity
public class FoodImpact {
    private String id; // given by the API
    private String gtin;
    private String name; // ENGLISH name
    private String ingredients;
    // nutrient-values OBJECT needs to be added (as to support the nutrient-vaulues
    // listeadosf)
    private String co2Rating;
    private int co2Value;

    public String getId() {
        return id;
    }

    public String getGtin() {
        return gtin;
    }

    public String getName() {
        return name;
    }

    public String getIngredients() {
        return ingredients;
    }

    public String getCo2Rating() {
        return co2Rating;
    }

    public int getCo2Value() {
        return co2Value;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setGtin(String gtin) {
        this.gtin = gtin;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public void setCo2Rating(String co2Rating) {
        this.co2Rating = co2Rating;
    }

    public void setCo2Value(int co2Value) {
        this.co2Value = co2Value;
    }

}
