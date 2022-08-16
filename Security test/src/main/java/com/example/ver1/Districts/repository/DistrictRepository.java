package com.example.ver1.Districts.repository;

import com.example.ver1.Districts.model.Districts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictRepository extends JpaRepository<Districts,Long> {
}
