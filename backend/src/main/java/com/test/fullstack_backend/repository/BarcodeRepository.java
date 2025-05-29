package com.test.fullstack_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import com.test.fullstack_backend.model.Barcode;

public interface BarcodeRepository extends JpaRepository<Barcode, Long> {
    Barcode findById(int id);

    List<Barcode> findByUserId(Long userId);
}
