package com.example.ver1.Stations.repository;
import com.example.ver1.Stations.model.Stations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StationsRepository extends JpaRepository<Stations,Long> {
    @Query(value = "SELECT * FROM Stations a \n" +
            "    join Districts b on a.district_id = b.id\n" +
            "    join Cities c on c.id = b.city_id\n" +
            "    WHERE b.district_name LIKE :searchKeyWords or c.city_name like :searchKeyWords", nativeQuery = true)
    List<Stations> searchStations(@Param("searchKeyWords") String searchKeyWords);

    @Query(value = "SELECT a.* FROM Stations a join Districts b on a.district_id = b.id WHERE lower(b.district_name) LIKE %:searchKeyWords%", nativeQuery = true)
    List<Stations> searchStations2(@Param("searchKeyWords") String searchKeyWords);

}

