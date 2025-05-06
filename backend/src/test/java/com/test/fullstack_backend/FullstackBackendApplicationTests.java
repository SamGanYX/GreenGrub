package com.test.fullstack_backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.test.fullstack_backend.model.FoodNutrition;

@SpringBootTest
class FullstackBackendApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void calebFoodNutritionTest() {
		FoodNutrition fi = new FoodNutrition();
		fi.setId("testId");
		assertEquals("testId", fi.getId());
		
	}

}
