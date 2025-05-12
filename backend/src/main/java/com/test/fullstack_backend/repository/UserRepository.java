package com.test.fullstack_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.test.fullstack_backend.model.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);
}
