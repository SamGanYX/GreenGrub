package com.test.fullstack_backend.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/food")
public class FoodImpactController {

    /**
     * Get product information by barcode
     * 
     * @param barcode The product barcode
     * @return JSON response from Open Food Facts API
     */
    @GetMapping("/product/{barcode}")
    public static String getProductByBarcode(@PathVariable String barcode) throws Exception {
        String apiUrl = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";
        return makeApiRequest(apiUrl);
    }

    /**
     * Search for products by keyword
     * 
     * @param searchTerm Search term to look for
     * @return JSON response from Open Food Facts API
     */
    @GetMapping("/search")
    public static String searchProducts(@RequestParam String searchTerm) throws Exception {
        String encodedSearchTerm = URLEncoder.encode(searchTerm, StandardCharsets.UTF_8.toString());
        String apiUrl = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=" + encodedSearchTerm
                + "&search_simple=1&action=process&json=1&page_size=5"; // Limited to 5 results
        return makeApiRequest(apiUrl);
    }

    /**
     * Helper method to make HTTP requests
     */
    private static String makeApiRequest(String apiUrl) throws Exception {
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // Set request properties
        connection.setRequestMethod("GET");
        connection.setRequestProperty("User-Agent", "GreenGrub/1.0");

        // Get response
        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            throw new RuntimeException("HTTP error code: " + responseCode);
        }

        // Read response
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return response.toString();
    }
}