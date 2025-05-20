package com.test.fullstack_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OpenFood {

    @JsonProperty("product")
    private Product product;

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public static class Product {

        @JsonProperty("product_name")
        private String productName;

        private String brands;

        @JsonProperty("code")
        private String barcode;

        @JsonProperty("ecoscore_grade")
        private String ecoscoreGrade;

        @JsonProperty("ecoscore_score")
        private Integer ecoscoreScore;

        private Nutriments nutriments;

        @JsonProperty("ecoscore_data")
        private EcoscoreData ecoscoreData;

        // Getters and setters
        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }

        public String getBrands() { return brands; }
        public void setBrands(String brands) { this.brands = brands; }

        public String getBarcode() { return barcode; }
        public void setBarcode(String barcode) { this.barcode = barcode; }

        public String getEcoscoreGrade() { return ecoscoreGrade; }
        public void setEcoscoreGrade(String ecoscoreGrade) { this.ecoscoreGrade = ecoscoreGrade; }

        public Integer getEcoscoreScore() { return ecoscoreScore; }
        public void setEcoscoreScore(Integer ecoscoreScore) { this.ecoscoreScore = ecoscoreScore; }

        public Nutriments getNutriments() { return nutriments; }
        public void setNutriments(Nutriments nutriments) { this.nutriments = nutriments; }

        public EcoscoreData getEcoscoreData() { return ecoscoreData; }
        public void setEcoscoreData(EcoscoreData ecoscoreData) { this.ecoscoreData = ecoscoreData; }
    }

    public static class Nutriments {

        @JsonProperty("energy-kcal_100g")
        private String energyKcal100g;

        @JsonProperty("fat_100g")
        private String fat100g;

        @JsonProperty("saturated-fat_100g")
        private String saturatedFat100g;

        @JsonProperty("sugars_100g")
        private String sugars100g;

        @JsonProperty("salt_100g")
        private String salt100g;

        @JsonProperty("proteins_100g")
        private String proteins100g;

        // Getters and setters
        public String getEnergyKcal100g() { return energyKcal100g; }
        public void setEnergyKcal100g(String energyKcal100g) { this.energyKcal100g = energyKcal100g; }

        public String getFat100g() { return fat100g; }
        public void setFat100g(String fat100g) { this.fat100g = fat100g; }

        public String getSaturatedFat100g() { return saturatedFat100g; }
        public void setSaturatedFat100g(String saturatedFat100g) { this.saturatedFat100g = saturatedFat100g; }

        public String getSugars100g() { return sugars100g; }
        public void setSugars100g(String sugars100g) { this.sugars100g = sugars100g; }

        public String getSalt100g() { return salt100g; }
        public void setSalt100g(String salt100g) { this.salt100g = salt100g; }

        public String getProteins100g() { return proteins100g; }
        public void setProteins100g(String proteins100g) { this.proteins100g = proteins100g; }
    }

    public static class EcoscoreData {

        private Agribalyse agribalyse;

        public Agribalyse getAgribalyse() { return agribalyse; }
        public void setAgribalyse(Agribalyse agribalyse) { this.agribalyse = agribalyse; }

        public static class Agribalyse {
            @JsonProperty("co2_total")
            private String co2Total;

            @JsonProperty("co2_total_unit")
            private String co2TotalUnit;

            public String getCo2Total() { return co2Total; }
            public void setCo2Total(String co2Total) { this.co2Total = co2Total; }

            public String getCo2TotalUnit() { return co2TotalUnit; }
            public void setCo2TotalUnit(String co2TotalUnit) { this.co2TotalUnit = co2TotalUnit; }
        }
    }
}
