package com.test.fullstack_backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.test.fullstack_backend.model.FoodNutrition;
import com.test.fullstack_backend.model.Users;
import com.test.fullstack_backend.repository.UserRepository; // Adjust this to your actual repository class

@SpringBootTest(properties = {
        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
})
class FullstackBackendApplicationTests {

    @MockBean
    private UserRepository userRepository; // Replace with your actual repository

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
