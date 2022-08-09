package com.example.ver1.Cities.service;

import com.example.ver1.Cities.model.Cities;
import com.example.ver1.Cities.repository.CitiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CitiesServiceImpl implements CitiesService{
    @Autowired
    private CitiesRepository citiesRepository;
    @Override
    public List<Cities> getAllCities() {
        return citiesRepository.findAll();
    }

    @Override
    public Cities getCityById(long id) {
        Optional<Cities> optional = citiesRepository.findById(id);
        Cities c = null;
        if (optional.isPresent()) {
            c = optional.get();
        } else {
            throw new RuntimeException("City not found");
        }
        return c;
    }

    @Override
    public Page<Cities> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return this.citiesRepository.findAll(pageable);
    }
}
