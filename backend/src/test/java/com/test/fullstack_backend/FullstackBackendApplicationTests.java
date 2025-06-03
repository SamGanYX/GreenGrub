package com.test.fullstack_backend;

import java.io.IOException;

import com.test.fullstack_backend.model.Users;
import com.test.fullstack_backend.repository.UserRepository;
import com.test.fullstack_backend.repository.BarcodeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.fullstack_backend.model.OpenFood;

@SpringBootTest
@AutoConfigureMockMvc
class FullstackBackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BarcodeRepository barcodeRepository;

	@MockBean
	private RestTemplate restTemplate;

	@BeforeEach
	void setUp() {
		barcodeRepository.deleteAll(); // Clear the repository before each test
		userRepository.deleteAll(); // Clear the repository before each test
	}

	@Test
	void contextLoads() {
	}

	public static class OpenFoodFactsProductTest {

		@Test
		public void testDeserialization() throws Exception {
			String json = """
					{
					"product": {
						"product_name": "Organic Banana",
						"brands": "Nature's Pride",
						"code": "1234567890123",
						"ecoscore_grade": "a",
						"ecoscore_score": 90,
						"nutriments": {
						"energy-kcal_100g": "89",
						"fat_100g": "0.3",
						"saturated-fat_100g": "0.1",
						"sugars_100g": "12",
						"salt_100g": "0.0",
						"proteins_100g": "1.1"
						},
						"ecoscore_data": {
						"agribalyse": {
							"co2_total": "0.9",
							"co2_total_unit": "kg"
						}
						}
					}
					}
					""";

			ObjectMapper objectMapper = new ObjectMapper();
			OpenFood productWrapper = objectMapper.readValue(json, OpenFood.class);
			OpenFood.Product product = productWrapper.getProduct();

			assertNotNull(product);
			assertEquals("Organic Banana", product.getProductName());
			assertEquals("Nature's Pride", product.getBrands());
			assertEquals("1234567890123", product.getBarcode());
			assertEquals("a", product.getEcoscoreGrade());
			assertEquals(90, product.getEcoscoreScore());

			OpenFood.Nutriments nutriments = product.getNutriments();
			assertNotNull(nutriments);
			assertEquals("89", nutriments.getEnergyKcal100g());
			assertEquals("0.3", nutriments.getFat100g());
			assertEquals("1.1", nutriments.getProteins100g());

			OpenFood.EcoscoreData ecoscoreData = product.getEcoscoreData();
			assertNotNull(ecoscoreData);
			assertEquals("0.9", ecoscoreData.getAgribalyse().getCo2Total());
			assertEquals("kg", ecoscoreData.getAgribalyse().getCo2TotalUnit());
		}
	}

	@Test
	void testGetProductByBarcodeSuccess() throws Exception {
		OpenFood mockResponse = new OpenFood();
		OpenFood.Product mockProduct = new OpenFood.Product();
		mockProduct.setProductName("Almond Breeze Original Unsweetened Almond Milk");
		mockProduct.setBrands("Blue Diamond");
		mockProduct.setBarcode("0041570054161");
		mockResponse.setProduct(mockProduct);

		when(restTemplate.getForObject(
				eq("https://world.openfoodfacts.org/api/v2/product/0041570054161.json"),
				eq(OpenFood.class)))
				.thenReturn(mockResponse);

		mockMvc.perform(get("/openfood/barcode/0041570054161"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.product.product_name").value("Almond Breeze Original Unsweetened Almond Milk"))
				.andExpect(jsonPath("$.product.brands").value("Blue Diamond"))
				.andExpect(jsonPath("$.product.code").value("0041570054161"));
	}

	@Test
	void testGetProductByBarcodeNotFound() throws Exception {
		when(restTemplate.getForObject(
				eq("https://world.openfoodfacts.org/api/v2/product/9999999999999.json"),
				eq(OpenFood.class)))
				.thenReturn(null);

		mockMvc.perform(get("/openfood/barcode/9999999999999"))
				.andExpect(status().isNotFound());
	}

	@Test
	void testGetProductByBarcodeEmptyProduct() throws Exception {
		// Mock RestTemplate to return response with null product
		OpenFood mockResponse = new OpenFood();
		mockResponse.setProduct(null);

		when(restTemplate.getForObject(
				eq("https://world.openfoodfacts.org/api/v2/product/1111111111111.json"),
				eq(OpenFood.class)))
				.thenReturn(mockResponse);

		mockMvc.perform(get("/openfood/barcode/1111111111111"))
				.andExpect(status().isNotFound());
	}

	@Test
	void testGetProductByBarcodeException() throws Exception {
		when(restTemplate.getForObject(anyString(), eq(OpenFood.class)))
				.thenThrow(new RuntimeException("API Error"));

		mockMvc.perform(get("/openfood/barcode/0041570054161"))
				.andExpect(status().isInternalServerError());
	}

	@Test
	void testFatSecretIDFromeBarcode() throws IOException {
		// Write one test for an id that exists
		// Write one test for an id not in database
	}

	@Test
	void testFatSecretNutritionFromID() throws IOException {
		// Write one test for a good barcode
		// Write one test for a fake barcode / not in database
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

	@Test
	void testSetPreference() throws Exception {
		// Create a new user for testing
		Users testUser = new Users();
		testUser.setUsername("testuser");
		testUser.setPassword("password123");
		testUser.setPreference(Users.Preference.PROTEIN);
		userRepository.save(testUser);

		assertEquals(Users.Preference.PROTEIN, testUser.getPreference());

		MvcResult result = mockMvc.perform(put("/update/testuser")
				.param("preference", "skibidi")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();

		// Validate the response
		String responseContent = result.getResponse().getContentAsString();
		assertEquals(true, responseContent.contains("token"));
		assertEquals(true, responseContent.contains("username"));
		assertEquals(true, responseContent.contains("should be set to: skibidi"));
		assertEquals(false, responseContent.contains("PROTEIN"));
	}
}