package com.example.ver1.Cities.service;

import com.example.ver1.Cities.model.Cities;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CitiesService {
    List<Cities> getAllCities();

    Cities getCityById(long id);

    Page<Cities> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection);
}
