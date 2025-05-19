package com.test.fullstack_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FoodNutrition {
    private Food food;

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public static class Food {
        @JsonProperty("brand_name")
        private String brandName;

        @JsonProperty("food_id")
        private String foodId;

        @JsonProperty("food_name")
        private String foodName;

        @JsonProperty("food_type")
        private String foodType;

        @JsonProperty("food_url")
        private String foodUrl;

        private Servings servings;

        public String getBrandName() {
            return brandName;
        }

        public void setBrandName(String brandName) {
            this.brandName = brandName;
        }

        public String getFoodId() {
            return foodId;
        }

        public void setFoodId(String foodId) {
            this.foodId = foodId;
        }

        public String getFoodName() {
            return foodName;
        }

        public void setFoodName(String foodName) {
            this.foodName = foodName;
        }

        public String getFoodType() {
            return foodType;
        }

        public void setFoodType(String foodType) {
            this.foodType = foodType;
        }

        public String getFoodUrl() {
            return foodUrl;
        }

        public void setFoodUrl(String foodUrl) {
            this.foodUrl = foodUrl;
        }

        public Servings getServings() {
            return servings;
        }

        public void setServings(Servings servings) {
            this.servings = servings;
        }
    }

    public static class Servings {
        private Serving serving;

        public Serving getServing() {
            return serving;
        }

        public void setServing(Serving serving) {
            this.serving = serving;
        }
    }

    public static class Serving {
        private String calcium;
        private String calories;
        private String carbohydrate;
        private String cholesterol;
        private String fat;
        private String fiber;
        private String iron;

        @JsonProperty("measurement_description")
        private String measurementDescription;

        @JsonProperty("metric_serving_amount")
        private String metricServingAmount;

        @JsonProperty("metric_serving_unit")
        private String metricServingUnit;

        @JsonProperty("monounsaturated_fat")
        private String monounsaturatedFat;

        @JsonProperty("number_of_units")
        private String numberOfUnits;

        @JsonProperty("polyunsaturated_fat")
        private String polyunsaturatedFat;

        private String potassium;
        private String protein;

        @JsonProperty("saturated_fat")
        private String saturatedFat;

        @JsonProperty("serving_description")
        private String servingDescription;

        @JsonProperty("serving_id")
        private String servingId;

        @JsonProperty("serving_url")
        private String servingUrl;

        private String sodium;
        private String sugar;

        @JsonProperty("trans_fat")
        private String transFat;

        @JsonProperty("vitamin_a")
        private String vitaminA;

        // Getters and setters
        public String getCalcium() { return calcium; }
        public void setCalcium(String calcium) { this.calcium = calcium; }

        public String getCalories() { return calories; }
        public void setCalories(String calories) { this.calories = calories; }

        public String getCarbohydrate() { return carbohydrate; }
        public void setCarbohydrate(String carbohydrate) { this.carbohydrate = carbohydrate; }

        public String getCholesterol() { return cholesterol; }
        public void setCholesterol(String cholesterol) { this.cholesterol = cholesterol; }

        public String getFat() { return fat; }
        public void setFat(String fat) { this.fat = fat; }

        public String getFiber() { return fiber; }
        public void setFiber(String fiber) { this.fiber = fiber; }

        public String getIron() { return iron; }
        public void setIron(String iron) { this.iron = iron; }

        public String getMeasurementDescription() { return measurementDescription; }
        public void setMeasurementDescription(String measurementDescription) { this.measurementDescription = measurementDescription; }

        public String getMetricServingAmount() { return metricServingAmount; }
        public void setMetricServingAmount(String metricServingAmount) { this.metricServingAmount = metricServingAmount; }

        public String getMetricServingUnit() { return metricServingUnit; }
        public void setMetricServingUnit(String metricServingUnit) { this.metricServingUnit = metricServingUnit; }

        public String getMonounsaturatedFat() { return monounsaturatedFat; }
        public void setMonounsaturatedFat(String monounsaturatedFat) { this.monounsaturatedFat = monounsaturatedFat; }

        public String getNumberOfUnits() { return numberOfUnits; }
        public void setNumberOfUnits(String numberOfUnits) { this.numberOfUnits = numberOfUnits; }

        public String getPolyunsaturatedFat() { return polyunsaturatedFat; }
        public void setPolyunsaturatedFat(String polyunsaturatedFat) { this.polyunsaturatedFat = polyunsaturatedFat; }

        public String getPotassium() { return potassium; }
        public void setPotassium(String potassium) { this.potassium = potassium; }

        public String getProtein() { return protein; }
        public void setProtein(String protein) { this.protein = protein; }

        public String getSaturatedFat() { return saturatedFat; }
        public void setSaturatedFat(String saturatedFat) { this.saturatedFat = saturatedFat; }

        public String getServingDescription() { return servingDescription; }
        public void setServingDescription(String servingDescription) { this.servingDescription = servingDescription; }

        public String getServingId() { return servingId; }
        public void setServingId(String servingId) { this.servingId = servingId; }

        public String getServingUrl() { return servingUrl; }
        public void setServingUrl(String servingUrl) { this.servingUrl = servingUrl; }

        public String getSodium() { return sodium; }
        public void setSodium(String sodium) { this.sodium = sodium; }

        public String getSugar() { return sugar; }
        public void setSugar(String sugar) { this.sugar = sugar; }

        public String getTransFat() { return transFat; }
        public void setTransFat(String transFat) { this.transFat = transFat; }

        public String getVitaminA() { return vitaminA; }
        public void setVitaminA(String vitaminA) { this.vitaminA = vitaminA; }
    }
}
