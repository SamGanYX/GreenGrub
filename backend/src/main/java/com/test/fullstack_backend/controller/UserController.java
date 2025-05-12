package com.test.fullstack_backend.controller;

import java.util.*;

import com.test.fullstack_backend.model.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    Users newUser(@RequestBody Users newUser) {
        if (userRepository.findByUsername(newUser.getUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        return userRepository.save(newUser);
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
        return response;
    }

    @GetMapping("/users")
    List<Users> getAllUsers() {
        return userRepository.findAll();
    }

}
