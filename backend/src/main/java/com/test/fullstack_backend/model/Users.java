package com.test.fullstack_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    public enum Preference {
        LOW_CALORIE,
        HIGH_CALORIE,
        LOW_SUGAR,
        NUTRISCORE,
        ECOSCORE,
        PROTEIN
    }

    @Enumerated(EnumType.STRING)
    private Preference preference;

    public Users() {
        this.preference = Preference.ECOSCORE;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Preference getPreference() {
        return preference;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPreference(Preference preference) {
        this.preference = preference;
    }
}
