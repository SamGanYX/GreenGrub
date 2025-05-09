package com.test.fullstack_backend.controller;

import java.net.http.HttpHeaders;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import org.springframework.http.MediaType;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.stereotype.Service;

import com.test.fullstack_backend.model.FatSecretAccessToken;
import com.test.fullstack_backend.repository.UserRepository;

@RestController
@CrossOrigin
public class NutritionController {

    //TODO: Figure out how to reuse rest client calls
    public FatSecretAccessToken getAccessToken() {

        String clientId = "YOUR_CLIENT_ID";
        String clientSecret = "YOUR_CLIENT_SECRET";

        RestClient restClient = RestClient.builder()
            .baseUrl("https://oauth.fatsecret.com")
            .requestInterceptor(new BasicAuthenticationInterceptor(clientId, clientSecret))
            .defaultHeader("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE)
            .build();
        String formBody = "grant_type=client_credentials&scope=basic";

        return restClient.post()
            .uri("/connect/token")
            .body(formBody)
            .retrieve()
            .body(FatSecretAccessToken.class);
    }

    public String getNutritionFromId(String accessToken, String foodId) {

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
            .body(String.class);
}


    public String getIdFromBarcode(String accessToken, int barcode) {
        RestClient client = RestClient.builder()
            .baseUrl("https://platform.fatsecret.com/rest/server.api")
            .defaultHeaders(headers -> {
                headers.setBearerAuth(accessToken); // Sets "Authorization: Bearer <token>"
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Sets correct Content-Type
            })
            .build();

        String body = "method=food.find_id_for_barcode&barcode=" + barcode + "&format=json";
        return client.post()
            .body(body)
            .retrieve()
            .body(String.class);
    }
}
