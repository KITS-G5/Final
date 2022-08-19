package com.example.ver1.Bikes.repository;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Stations.model.Stations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikesRepository extends JpaRepository<Bikes,Long> {
    Page<Bikes> findAll(Pageable pageable);
    List<Bikes> findBikesByStation(Stations station);
}
