package com.test.fullstack_backend.model;

public class FoodNutrition {
    private String id;
    private String gtin;
    private String name;
    private String ingredients;
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
}
