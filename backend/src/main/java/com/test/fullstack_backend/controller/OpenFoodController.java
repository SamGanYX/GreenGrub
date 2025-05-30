package com.test.fullstack_backend.controller;

import com.test.fullstack_backend.model.OpenFood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class OpenFoodController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String OPENFOODFACTS_API = "https://world.openfoodfacts.org/api/v2/product/";

    @GetMapping("/{barcode}")
    public ResponseEntity<OpenFood> getProductByBarcode(@PathVariable String barcode) {
        try {
            String url = OPENFOODFACTS_API + barcode + ".json";
            OpenFood response = restTemplate.getForObject(url, OpenFood.class);

            if (response != null && response.getProduct() != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}