package com.test.fullstack_backend.repository;

import com.test.fullstack_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
