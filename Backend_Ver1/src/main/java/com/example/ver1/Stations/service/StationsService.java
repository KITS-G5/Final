package com.example.ver1.Stations.service;

import com.example.ver1.Stations.model.Stations;
import org.springframework.data.domain.Page;
import java.util.List;

public interface StationsService {
    List<Stations> getAllStations();

    Stations getStationById(long id);

    void saveStation(Stations stations);

    void updateStation(Stations stations, long id);

    void deleteStation(long id);

    Page<Stations> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection);

//    List<Stations> searchStationsByDistrict(String district);
}
