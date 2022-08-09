package com.example.ver1.Districts.controller;

import com.example.ver1.Districts.model.Districts;
import com.example.ver1.Districts.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class DistrictController {
    @Autowired
    private DistrictRepository districtRepository;

    @GetMapping("/districts")
    public List<Districts> getAllDistricts() {
        return districtRepository.findAll();
    }

    @GetMapping("/districts/{id}")
    public Districts one(@PathVariable Long id) {
        Optional<Districts> districts = districtRepository.findById(id);
        Districts districts1 = null;
        districts1 = districts.get();
        return districts1;
    }
}
