package com.test.fullstack_backend;

import java.nio.file.Files; // Add this import
import java.nio.file.Paths;

import com.test.fullstack_backend.controller.UserController;
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
	}

	@Test
	void contextLoads() {
	}

	@Test
	void testLogin() throws Exception {
		// Create a new user for testing
		Users testUser = new Users();
		testUser.setUsername("testuser");
		testUser.setPassword("password123");
		userRepository.save(testUser); // Save the user to the repository

		// Perform the login request
		MvcResult result = mockMvc.perform(post("/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"username\":\"testuser\", \"password\":\"password123\"}"))
				.andExpect(status().isOk())
				.andReturn();

		// Validate the response
		String responseContent = result.getResponse().getContentAsString();
		assertEquals(true, responseContent.contains("token"));
		assertEquals(true, responseContent.contains("userID"));
		assertEquals(true, responseContent.contains("username"));
	}
}