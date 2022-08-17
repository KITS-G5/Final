package com.example.ver1.Stations.service;

import com.example.ver1.Stations.model.Stations;
import com.example.ver1.Stations.repository.StationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StationsServiceImpl implements StationsService{
    @Autowired
    private StationsRepository stationsRepository;
    @Override
    public List<Stations> getAllStations() {
        return stationsRepository.findAll();
    }

    @Override
    public Stations getStationById(long id) {
        Optional<Stations> optional = stationsRepository.findById(id);
        Stations s = null;
        if (optional.isPresent()) {
            s = optional.get();
        } else {
            throw new RuntimeException("Station not found");
        }
        return s;
    }

    @Override
    public void saveStation(Stations stations) {
        this.stationsRepository.save(stations);
    }

    @Override
    public void updateStation(Stations stations, long id) {
        Optional<Stations> optional = stationsRepository.findById(id);
        Stations s = null;
        if (optional.isPresent()) {
            s = optional.get();
            s.setStationName(stations.getStationName());
            s.setCity(stations.getCity());
            s.setDistrict(stations.getDistrict());
            stationsRepository.save(s);
        } else {
            throw new RuntimeException("Station not found");
        }
    }

    @Override
    public void deleteStation(long id) {
        Optional<Stations> optional = stationsRepository.findById(id);
        if (optional.isPresent()) {
            this.stationsRepository.deleteById(id);
        } else {
            throw new RuntimeException("Station not found");
        }
    }

    @Override
    public Page<Stations> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return this.stationsRepository.findAll(pageable);
    }
}
