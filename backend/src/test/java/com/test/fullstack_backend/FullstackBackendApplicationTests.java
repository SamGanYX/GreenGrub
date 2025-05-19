package com.test.fullstack_backend;

import java.io.IOException;
import java.nio.file.Files; // Add this import
import java.nio.file.Paths;

import com.test.fullstack_backend.controller.NutritionController;
import com.test.fullstack_backend.controller.UserController;
import com.test.fullstack_backend.model.FatSecretAccessToken;
import com.test.fullstack_backend.model.FoodNutrition;
import com.test.fullstack_backend.model.Users;
import com.test.fullstack_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
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
	void testFatSecretAccessToken() throws IOException {
		NutritionController controller = new NutritionController();
		FatSecretAccessToken token = controller.getAccessToken();
		String id = controller.getIdFromBarcode(token.getAccess_token(), "0041570054161");
		FoodNutrition info = controller.getNutritionFromId(token.getAccess_token(), id);
		Files.write(Paths.get("NutritionResponse.txt"), info.getFood().getFoodName().getBytes());

		assert(info.getFood().getFoodName().equals("Almond Breeze Original Unsweetened Almond Milk"));
	}

	@Test
	void testLogin() throws Exception {
		// Create a new user for testing
		Users testUser = new Users();
		testUser.setUsername("testuser");
		testUser.setPassword("password123");
		userRepository.save(testUser); // Save the user to the repository

		MvcResult result = mockMvc.perform(post("/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"username\":\"testuser\", \"password\":\"password123\"}"))
				.andExpect(status().isOk())
				.andReturn();

		// Validate the response
		String responseContent = result.getResponse().getContentAsString();
		assertEquals(true, responseContent.contains("token"));
		assertEquals(true, responseContent.contains("username"));
	}
}