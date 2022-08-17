package com.example.ver1.Bikes.service;

import com.example.ver1.Bikes.model.Bikes;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BikesService {
    List<Bikes> getAllBikes();

    Bikes getBikeById(long id);

    void saveBike(Bikes bikes);

    void updateBike(Bikes bikes, long id);

    void deleteBike(long id);

    Page<Bikes> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection);
}
