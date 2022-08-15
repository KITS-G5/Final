package com.example.ver1.Stations.controller;

import com.example.ver1.Stations.model.Stations;
import com.example.ver1.Stations.service.StationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class StationsController {
    @Autowired
    private StationsService stationsService;

    //    @GetMapping("/")
//    private void viewStations(Model model) {
//        findPaginated(1, "station_name", "asc", model);
//    }
    @GetMapping("/stations")
    public List<Stations> getAllStations() {
        return stationsService.getAllStations();
    }

    @PostMapping("/stations")
    public void newStationPage(@RequestBody Stations stations) {
        stationsService.saveStation(stations);
    }

    @GetMapping("/stations/{id}")
    public void getOneStation(@PathVariable Long id) {
        stationsService.getStationById(id);
    }

    @PutMapping("/stations/updateStation/{id}")
    public void updateStation(@RequestBody Stations stations, @PathVariable long id) {
        stationsService.updateStation(stations, id);
    }

    @DeleteMapping("/stations/deleteStation/{id}")
    public void deleteStation(@PathVariable(value = "id") long id) {
        stationsService.deleteStation(id);
    }

//    @GetMapping("/page/{pageNo}")
//    private void findPaginated(@PathVariable(value = "pageNo") int pageNo, @RequestParam("sortField") String sortField, @RequestParam("sortDirection") String sortDirection, Model model) {
//        int pageSize = 5;
//        Page<Stations> page = stationsService.findPaginated(pageNo, pageSize, sortField, sortDirection);
//        List<Stations> list = page.getContent();
//
//        model.addAttribute("currentPage", pageNo);
//        model.addAttribute("totalPages", page.getTotalPages());
//        model.addAttribute("totalItems", page.getTotalElements());
//        model.addAttribute("sortField", sortField);
//        model.addAttribute("sortDirection", sortDirection);
//        model.addAttribute("reverseSort", sortDirection.equals("asc") ? "desc" : "asc");
//
//        model.addAttribute("listStations", list);
//    }
}
