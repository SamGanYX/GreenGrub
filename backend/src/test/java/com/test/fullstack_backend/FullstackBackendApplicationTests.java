package com.test.fullstack_backend;

import java.nio.file.Files; // Add this import
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.test.fullstack_backend.controller.FoodImpactController;
import com.test.fullstack_backend.model.Users;
import com.test.fullstack_backend.repository.UserRepository;


@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=password",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
class FullstackBackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserRepository userRepository;

	@BeforeEach
	void setUp() {
		userRepository.deleteAll(); // Clear the repository before each test
	}

	@Test
	void contextLoads() {
	}

	@Test
	void testUsersNotEmpty() throws Exception {
		// Create a new user JSON object
		String newUserJson = "{\"username\":\"JohnDoe\",\"email\":\"johndoe@uw.edu\",\"name\":\"John Doe\"}";

		// Call the newUser endpoint to add the user
		mockMvc.perform(post("/user")
				.contentType(MediaType.APPLICATION_JSON)
				.content(newUserJson))
				.andExpect(status().isOk());

		// Call the getAllUsers endpoint and capture the response
		MvcResult result = mockMvc.perform(get("/users"))
				.andExpect(status().isOk())
				.andReturn(); // Capture the result

		// Write the result to a .txt file instead of printing
		String responseContent = result.getResponse().getContentAsString();
		Files.write(Paths.get("response.txt"), responseContent.getBytes()); // Write to file

		// Check that the response is not empty
		mockMvc.perform(get("/users"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").isNotEmpty()); // Check that the response is not empty
	}
	@Test
	void fullNameTest() {
		Users newUser = new Users();
		String name = "Barny";
		newUser.setName(name);
		assertEquals(name, newUser.getName());
	}
	@Test
		void BryanNutritionTest() {
			try {
				// Example 1: Get product by barcode
				String barcode = "3017620422003"; // Example barcode (Nutella)
				String productInfo = FoodImpactController.getProductByBarcode(barcode);
				assertNotNull(productInfo, "Product information should not be null");
				System.out.println("Product Information:");
				System.out.println(productInfo);
				
				// Example 2: Search for products
				String searchTerm = "chocolate";
				String searchResults = FoodImpactController.searchProducts(searchTerm);
				assertNotNull(searchResults, "Search results should not be null");
				System.out.println("\nSearch Results for '" + searchTerm + "':");
				System.out.println(searchResults);
			} catch (Exception e) {
				e.printStackTrace();
				throw new AssertionError("Test failed with exception: " + e.getMessage());
			}
		}
}

// ... existing code ...