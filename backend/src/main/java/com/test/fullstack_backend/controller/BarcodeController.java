package com.test.fullstack_backend.controller;

import com.test.fullstack_backend.model.Barcode;
import com.test.fullstack_backend.repository.BarcodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/barcodes")
public class BarcodeController {

    @Autowired
    private BarcodeRepository barcodeRepository;

    // GET method to retrieve barcodes by user_id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Barcode>> getBarcodesByUserId(@PathVariable Long userId) {
        List<Barcode> barcodes = barcodeRepository.findByUserId(userId);
        return ResponseEntity.ok(barcodes);
    }

    // POST method to create a new barcode
    @PostMapping("/add")
    public ResponseEntity<Barcode> createBarcode(@RequestBody Barcode barcode) {
        Barcode savedBarcode = barcodeRepository.save(barcode);
        return ResponseEntity.ok(savedBarcode);
    }
}