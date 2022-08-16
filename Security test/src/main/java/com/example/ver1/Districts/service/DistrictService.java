package com.example.ver1.Districts.service;

import com.example.ver1.Districts.model.Districts;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DistrictService {
    List<Districts> getAllDistricts();

    Districts getDistrictById(long id);

    Page<Districts> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection);
}
