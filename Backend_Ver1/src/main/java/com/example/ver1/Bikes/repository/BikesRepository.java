package com.example.ver1.Bikes.repository;

import com.example.ver1.Bikes.model.Bikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikesRepository extends JpaRepository<Bikes,Long> {
}
