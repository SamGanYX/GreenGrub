package com.test.fullstack_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Barcode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String barcode;
    private Boolean active;

    // Getter for id
    public Long getId() {
        return id;
    }

    // Getter for userId
    public Long getUserId() {
        return userId;
    }

    // Setter for userId
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter for barcode
    public String getBarcode() {
        return barcode;
    }

    // Setter for barcode
    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    // Getter for active
    public Boolean getActive() {
        return active;
    }

    // Setter for active
    public void setActive(Boolean active) {
        this.active = active;
    }
}
