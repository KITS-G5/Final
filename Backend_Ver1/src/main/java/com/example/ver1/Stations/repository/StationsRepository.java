package com.example.ver1.Stations.repository;
import com.example.ver1.Stations.model.Stations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StationsRepository extends JpaRepository<Stations,Long> {
    @Query(value = "SELECT a.* FROM Stations a join Districts b on a.district_id = b.id WHERE lower(b.district_name) LIKE %:searchKeyWords%", nativeQuery = true)
    List<Stations> searchStations(@Param("searchKeyWords") String searchKeyWords);
}

