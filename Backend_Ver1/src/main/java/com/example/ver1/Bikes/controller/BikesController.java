package com.example.ver1.Bikes.controller;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Bikes.service.BikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class BikesController {
    @Autowired
    private BikesService bikesService;

    @GetMapping("/bikes")
    public List<Bikes> getAllBikes() {
        return bikesService.getAllBikes();
    }

    @GetMapping(path = "station/bikes/{stationId}")
    public List<Bikes> getBikesByStationId(@PathVariable long stationId){
        return bikesService.getBikesByStation(stationId);
    }

    @GetMapping({"/bikes/page/{pageNo}", "/bikes/page"})
    public Page<Bikes> getAllBikes(@PathVariable (required = false) Integer pageNo) {
        int pageSize = 20;
        if(pageNo != null) {
            return bikesService.getAllBikesByPage(pageNo, pageSize);
        }
        return bikesService.getAllBikesByPage(1, pageSize);
    }

    @PostMapping("/bikes")
    public void newBikePage(@RequestBody Bikes bikes) {

        bikesService.saveBike(bikes);
    }

    @GetMapping("/bikes/{id}")
    @ResponseBody
    Optional<Bikes> getOneBike(@PathVariable long id) {
       return bikesService.getBikeById(id);
    }

    @PutMapping("/bikes/updateBike/{id}")
    public void updateBike(@RequestBody Bikes bikes, @PathVariable long id) {
        bikesService.updateBike(bikes,id);
    }

    @DeleteMapping("/bikes/deleteBike/{id}")
    public void deleteBike(@PathVariable(value = "id") long id) {
        bikesService.deleteBike(id);
    }

}
