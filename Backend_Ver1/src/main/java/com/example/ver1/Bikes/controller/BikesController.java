package com.example.ver1.Bikes.controller;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Bikes.service.BikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class BikesController {
    @Autowired
    private BikesService bikesService;

    @GetMapping("/bikes")
    public List<Bikes> getAllEmployees() {
        return bikesService.getAllBikes();
    }

    @PostMapping("/bikes")
    public void newBikePage(@RequestBody Bikes bikes) {
        bikesService.saveBike(bikes);
    }

    @GetMapping("/bikes/{id}")
    public void getOneBike(@PathVariable Long id) {
        bikesService.getBikeById(id);
    }

    @PutMapping("/bikes/updateBike/{id}")
    public void updateBike(@RequestBody Bikes bikes, @PathVariable Long id) {
        bikesService.updateBike(bikes,id);
    }

    @DeleteMapping("/bikes/deleteBike/{id}")
    public void deleteBike(@PathVariable(value = "id") long id) {
        bikesService.deleteBike(id);
    }

}