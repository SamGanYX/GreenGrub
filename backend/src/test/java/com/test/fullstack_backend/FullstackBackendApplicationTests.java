package com.test.fullstack_backend;

import java.io.IOException;
import java.nio.file.Files; // Add this import
import java.nio.file.Paths;

import com.test.fullstack_backend.controller.NutritionController;
import com.test.fullstack_backend.controller.UserController;
import com.test.fullstack_backend.model.FatSecretAccessToken;
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
		// NutritionController controller = new NutritionController();
		// FatSecretAccessToken token = controller.getAccessToken();
		// String id = controller.getIdFromBarcode(token.getAccess_token(), "3017620422003");
		// String info = controller.getNutritionFromId(token.getAccess_token(), id);
		// Files.write(Paths.get("NutritionResponse.txt"), info.getBytes());

		// assert(info != null);
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

}

// ... existing code ...