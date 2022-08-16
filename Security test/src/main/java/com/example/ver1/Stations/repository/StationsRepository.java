package com.example.ver1.Stations.repository;

import com.example.ver1.Stations.model.Stations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationsRepository extends JpaRepository<Stations,Long> {
}
