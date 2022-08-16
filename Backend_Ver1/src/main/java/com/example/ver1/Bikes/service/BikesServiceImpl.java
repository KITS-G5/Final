package com.example.ver1.Bikes.service;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Bikes.repository.BikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BikesServiceImpl implements BikesService{
    @Autowired
    private BikesRepository bikesRepository;
    @Override
    public List<Bikes> getAllBikes() {
        return bikesRepository.findAll();
    }

    @Override
    public Bikes getBikeById(long id) {
        Optional<Bikes> optional = bikesRepository.findById(id);
        Bikes b = null;
        if (optional.isPresent()) {
            b = optional.get();
        } else {
            throw new RuntimeException("Bike not found");
        }
        return b;
    }

    @Override
    public void saveBike(Bikes bikes) {
        this.bikesRepository.save(bikes);
    }

    @Override
    public void updateBike(Bikes bikes, long id) {
        Optional<Bikes> optional = bikesRepository.findById(id);
        Bikes b = null;
        if (optional.isPresent()) {
            b = optional.get();
            b.setBikeName(bikes.getBikeName());
            b.setStation(bikes.getStation());
            b.setStatus(bikes.getStatus());
            bikesRepository.save(b);
        } else {
            throw new RuntimeException("Bike not found");
        }
    }

    @Override
    public void deleteBike(long id) {
        Optional<Bikes> optional = bikesRepository.findById(id);
        if (optional.isPresent()) {
            this.bikesRepository.deleteById(id);
        } else {
            throw new RuntimeException("Bike not found");
        }
    }

    @Override
    public Page<Bikes> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable;
        if(sortField != null) {
            pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        }
        else {
            pageable = PageRequest.of(pageNo - 1, pageSize);
        }
        return this.bikesRepository.findAll(pageable);
    }
}
