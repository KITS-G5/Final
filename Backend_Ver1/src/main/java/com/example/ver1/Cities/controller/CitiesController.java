package com.example.ver1.Cities.controller;

import com.example.ver1.Cities.model.Cities;
import com.example.ver1.Cities.service.CitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CitiesController {
    @Autowired
    private CitiesService citiesService;

    @GetMapping("/cities")
    public List<Cities> getAllCities() {
        return citiesService.getAllCities();
    }
}
