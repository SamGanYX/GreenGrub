package com.test.fullstack_backend.controller;

import com.test.fullstack_backend.model.Barcode;
import com.test.fullstack_backend.model.Users;
import com.test.fullstack_backend.repository.BarcodeRepository;
import com.test.fullstack_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/barcodes")
public class BarcodeController {

    @Autowired
    private BarcodeRepository barcodeRepository;

    @Autowired
    private UserRepository userRepository;

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

    // POST method to remove a barcode by id
    @PostMapping("/remove/{id}")
    public ResponseEntity<Void> removeBarcode(@PathVariable Long id) {
        barcodeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // New GET method to retrieve and sort barcodes by user_id and preference
    @GetMapping("/user/sorted/{userId}")
    public ResponseEntity<List<Barcode>> getSortedBarcodesByUserId(@PathVariable Long userId) {
        List<Barcode> barcodes = barcodeRepository.findByUserId(userId);

        // Fetch user preference
        Users user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        String preference = user.getPreference().name(); // Get the user's preference

        // Sort barcodes based on user preference
        barcodes.sort(Comparator.comparing(barcode -> {
            Barcode b = (Barcode) barcode; // Cast to Barcode
            switch (preference) {
                case "LOW_CALORIE":
                    return Float.parseFloat(b.getEnergyKcal100g()); // Now this works
                case "HIGH_CALORIE":
                    return -Float.parseFloat(b.getEnergyKcal100g());
                case "LOW_SUGAR":
                    return Float.parseFloat(b.getSugars100g());
                case "NUTRISCORE":
                    return Float.parseFloat(b.getNutriscoreScore());
                case "ECOSCORE":
                    return -Float.parseFloat(b.getEcoscoreScore());
                case "PROTEIN":
                    return -(Float.parseFloat(b.getProteins100g()) / Float.parseFloat(b.getEnergyKcal100g()));
                default:
                    return 0f; // Default case if preference is not recognized
            }
        }));

        return ResponseEntity.ok(barcodes);
    }
}