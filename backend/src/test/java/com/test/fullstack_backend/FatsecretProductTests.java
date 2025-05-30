package com.test.fullstack_backend;

import java.io.IOException;

import com.test.fullstack_backend.controller.NutritionController;
import com.test.fullstack_backend.model.FatSecretAccessToken;
import com.test.fullstack_backend.model.FoodNutrition;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FatsecretProductTests {

    private FatSecretAccessToken token;
    private String tokenStr;

    @BeforeEach
    void setUp() throws IOException {
        token = NutritionController.getAccessToken();
        assertNotNull(token);
        assertNotNull(token.getAccess_token());
        tokenStr = token.getAccess_token();
    }

    @Test
    void contextLoads() {
    }

    @Test
    void testFatSecretAccessToken() throws IOException {
        String[] expectedScopes = { "barcode", "basic", "premier" };
        for (String scope : expectedScopes) {
            assertTrue(token.getScope().contains(scope), "Scope should include: " + scope);
        }
        assertNotNull(token.getExpires_in());
        assertNotNull(token.getToken_type());
    }

    @Test
    void testFatSecretIDFromeBarcode() throws IOException {
        String barcode = "0041570054161"; // Known valid barcode
        String id = NutritionController.getIdFromBarcode(token.getAccess_token(), barcode);
        assertEquals("5406437", id);

        // TODO: Add test for invalid barcode
    }

    @Test
    void testFatSecretNutritionFromID() throws IOException {
        String validID = "5406437";
        FoodNutrition nutrition = NutritionController.getNutritionFromId(token.getAccess_token(), validID);
        assertNotNull(nutrition);
        assertEquals("5406437", nutrition.getFood().getFoodId());
        assert (nutrition.getFood().getFoodName().equals("Almond Breeze Original Unsweetened Almond Milk"));

        // TODO: Add test for invalid input
        // String invalidID = "0000000";
        // FoodNutrition badNutrition =
        // NutritionController.getNutritionFromId(token.getAccess_token(), invalidID);
        // assertNull(badNutrition); // Or check for error handling
    }

    @Test
    void testFatSecretNutritionByBarcode() throws IOException {
        String barcode = "0041570054161";
        FoodNutrition nutrition = NutritionController.getNutritionByBarcode(barcode);
        assertNotNull(nutrition);
        assertEquals("5406437", nutrition.getFood().getFoodId());
        assert (nutrition.getFood().getFoodName().equals("Almond Breeze Original Unsweetened Almond Milk"));

        // TODO: Add this bad test
        // String badBarcode = "0000000000000";
        // FoodNutrition badNutrition =
        // NutritionController.getNutritionByBarcode(badBarcode);
        // assertThrows(badNutrition, ); // Or assert error message if thrown
    }
}
