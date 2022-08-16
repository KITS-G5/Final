package com.example.ver1.Districts.service;

import com.example.ver1.Districts.model.Districts;
import com.example.ver1.Districts.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DistrictServiceImpl implements DistrictService {
    @Autowired
    private DistrictRepository districtRepository;
    @Override
    public List<Districts> getAllDistricts() {
        return districtRepository.findAll();
    }

    @Override
    public Districts getDistrictById(long id) {
        Optional<Districts> optional = districtRepository.findById(id);
        Districts d = null;
        if (optional.isPresent()) {
            d = optional.get();
        } else {
            throw new RuntimeException("District not found");
        }
        return d;
    }

    @Override
    public Page<Districts> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return districtRepository.findAll(pageable);
    }
}
