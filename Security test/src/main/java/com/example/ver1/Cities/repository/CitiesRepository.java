package com.example.ver1.Cities.repository;

import com.example.ver1.Cities.model.Cities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitiesRepository extends JpaRepository<Cities,Long> {
}
