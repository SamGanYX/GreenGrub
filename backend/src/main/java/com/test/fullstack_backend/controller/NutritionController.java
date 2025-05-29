package com.test.fullstack_backend.controller;


import javax.management.RuntimeErrorException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import org.springframework.http.MediaType;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.fullstack_backend.model.FatSecretAccessToken;
import com.test.fullstack_backend.model.FoodNutrition;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin
public class NutritionController {

    private static String clientId = System.getenv("FATSECRET_CLIENT_ID");
    private static String clientSecret = System.getenv("FATSECRET_CLIENT_SECRET");

    public static FatSecretAccessToken getAccessToken() {

        if (clientId == null || clientSecret == null) {
            throw new RuntimeErrorException(null, "Fat Secret API keys not set as env variables");
        }

        RestClient restClient = RestClient.builder()

                .baseUrl("https://oauth.fatsecret.com")
                .requestInterceptor(new BasicAuthenticationInterceptor(clientId, clientSecret))
                .defaultHeader("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .build();
        String formBody = "grant_type=client_credentials";

        return restClient.post()
                .uri("/connect/token")
                .body(formBody)
                .retrieve()
                .body(FatSecretAccessToken.class);
    }

    public static FoodNutrition getNutritionFromId(String accessToken, String foodId) {

        RestClient client = RestClient.builder()
                .baseUrl("https://platform.fatsecret.com/rest/server.api")
                .defaultHeaders(headers -> {
                    headers.setBearerAuth(accessToken); // Sets "Authorization: Bearer <token>"
                    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Sets correct Content-Type
                })
                .build();

        String body = "method=food.get&food_id=" + foodId + "&format=json";

        return client.post()
                .body(body)
                .retrieve()
                .body(FoodNutrition.class);
    }

    public static String getIdFromBarcode(String accessToken, String barcode) {
        RestClient client = RestClient.builder()
                .baseUrl("https://platform.fatsecret.com/rest/server.api")
                .defaultHeaders(headers -> {
                    headers.setBearerAuth(accessToken);
                    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                })
                .build();

        String body = "method=food.find_id_for_barcode&barcode=" + barcode + "&format=json";

        String jsonResponse = client.post()
                .body(body)
                .retrieve()
                .body(String.class);

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(jsonResponse);
            return root.path("food_id").path("value").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse food_id from response: " + jsonResponse, e);
        }
    }

    @GetMapping("/nutrition/barcode/{barcode}")
    public static FoodNutrition getNutritionByBarcode(@PathVariable String barcode) {
        String accessToken = getAccessToken().getAccess_token(); // Assuming getAccessToken() returns a valid token
        String foodId = getIdFromBarcode(accessToken, barcode);
        return getNutritionFromId(accessToken, foodId);
    }
}
