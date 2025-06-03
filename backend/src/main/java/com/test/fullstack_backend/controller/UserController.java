package com.test.fullstack_backend.controller;

import java.util.*;

import com.test.fullstack_backend.model.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.test.fullstack_backend.repository.UserRepository;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create_account")
    Map<String, String> newUser(@RequestBody Users newUser) {
        if (userRepository.findByUsername(newUser.getUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        Users savedUser = userRepository.save(newUser);

        // Create a response map to return the token and userID
        Map<String, String> response = new HashMap<>();
        response.put("token", "congratsyouareloggedin"); // You might want to implement a real token generation
        response.put("userID", String.valueOf(savedUser.getId()));

        return response; // Return the response map
    }

    @PostMapping("/login")
    Map<String, String> getLogin(@RequestBody Users userInfo) {
        Users user = userRepository.findByUsername(userInfo.getUsername());
        if (user == null || !user.getPassword().equals(userInfo.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Generate a token
        String token = "congratsyouareloggedin";

        // Return the token in a map
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("userID", String.valueOf(user.getId()));
        response.put("username", userInfo.getUsername());
        response.put("password", userInfo.getPassword());
        response.put("preference", String.valueOf(user.getPreference()));
        return response;
    }

    @GetMapping("/users")
    List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/update/{username}")
    Map<String, String> changePreference(@PathVariable("username") String username,
            @RequestParam("preference") Users.Preference newPreference) {
        Users user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        user.setPreference(newPreference);
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("token", "should be set to: " + newPreference);
        response.put("userID", String.valueOf(user.getId()));
        response.put("username", user.getUsername());
        response.put("preference", user.getPreference().name());
        return response;
    }

    @PutMapping("/preference/{id}")
    Map<String, String> changePreferenceName(@PathVariable("id") Long userId,
            @RequestBody Users.Preference newPreference) {
        Users user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        user.setPreference(newPreference);
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("token", "should be set to: " + newPreference);
        response.put("userID", String.valueOf(user.getId()));
        response.put("username", user.getUsername());
        response.put("preference", user.getPreference().name());
        return response;
    }
}
