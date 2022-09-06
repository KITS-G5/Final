package com.example.ver1.Bikes.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Bikes.repository.BikesRepository;
import com.example.ver1.Cities.model.Cities;
import com.example.ver1.Districts.model.Districts;
import com.example.ver1.Stations.model.Stations;
import com.example.ver1.Stations.repository.StationsRepository;

import java.util.HashSet;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {BikesServiceImpl.class})
@ExtendWith(SpringExtension.class)
class BikesServiceImplTest {
    @MockBean
    private BikesRepository bikesRepository;

    @Autowired
    private BikesServiceImpl bikesServiceImpl;

    @MockBean
    private StationsRepository stationsRepository;

    /**
     * Method under test: {@link BikesServiceImpl#saveBike(Bikes)}
     */
    @Test
    void testSaveBike() {
        Cities cities = new Cities();
        cities.setCityName("Oxford");
        cities.setDistricts(new HashSet<>());
        cities.setId(123L);
        cities.setStations(new HashSet<>());

        Cities cities1 = new Cities();
        cities1.setCityName("Oxford");
        cities1.setDistricts(new HashSet<>());
        cities1.setId(123L);
        cities1.setStations(new HashSet<>());

        Districts districts = new Districts();
        districts.setCity(cities1);
        districts.setDistrictName("District Name");
        districts.setId(123L);
        districts.setStations(new HashSet<>());

        Stations stations = new Stations();
        stations.setBikes(new HashSet<>());
        stations.setCity(cities);
        stations.setDistrict(districts);
        stations.setId(123L);
        stations.setLatitude(10.0d);
        stations.setLongtitude(10.0d);
        stations.setStationAddress("42 Main St");
        stations.setStationName("Station Name");

        Bikes bikes = new Bikes();
        bikes.setBikeName("Bike Name");
        bikes.setId(123L);
        bikes.setOrders(new HashSet<>());
        bikes.setStation(stations);
        bikes.setStatus(true);
        when(bikesRepository.save((Bikes) any())).thenReturn(bikes);

        Cities cities2 = new Cities();
        cities2.setCityName("Oxford");
        cities2.setDistricts(new HashSet<>());
        cities2.setId(123L);
        cities2.setStations(new HashSet<>());

        Cities cities3 = new Cities();
        cities3.setCityName("Oxford");
        cities3.setDistricts(new HashSet<>());
        cities3.setId(123L);
        cities3.setStations(new HashSet<>());

        Districts districts1 = new Districts();
        districts1.setCity(cities3);
        districts1.setDistrictName("District Name");
        districts1.setId(123L);
        districts1.setStations(new HashSet<>());

        Stations stations1 = new Stations();
        stations1.setBikes(new HashSet<>());
        stations1.setCity(cities2);
        stations1.setDistrict(districts1);
        stations1.setId(123L);
        stations1.setLatitude(10.0d);
        stations1.setLongtitude(10.0d);
        stations1.setStationAddress("42 Main St");
        stations1.setStationName("Station Name");

        Bikes bikes1 = new Bikes();
        bikes1.setBikeName("Bike Name");
        bikes1.setId(123L);
        bikes1.setOrders(new HashSet<>());
        bikes1.setStation(stations1);
        bikes1.setStatus(true);
        bikesServiceImpl.saveBike(bikes1);
        verify(bikesRepository).save((Bikes) any());
        assertEquals("Bike Name", bikes1.getBikeName());
        assertTrue(bikes1.getStatus());
        assertSame(stations1, bikes1.getStation());
        assertTrue(bikes1.getOrders().isEmpty());
        assertEquals(123L, bikes1.getId().longValue());
        assertTrue(bikesServiceImpl.getAllBikes().isEmpty());
    }

    /**
     * Method under test: {@link BikesServiceImpl#saveBike(Bikes)}
     */
    @Test
    void testSaveBike2() {
        when(bikesRepository.save((Bikes) any())).thenThrow(new RuntimeException("An error occurred"));

        Cities cities = new Cities();
        cities.setCityName("Oxford");
        cities.setDistricts(new HashSet<>());
        cities.setId(123L);
        cities.setStations(new HashSet<>());

        Cities cities1 = new Cities();
        cities1.setCityName("Oxford");
        cities1.setDistricts(new HashSet<>());
        cities1.setId(123L);
        cities1.setStations(new HashSet<>());

        Districts districts = new Districts();
        districts.setCity(cities1);
        districts.setDistrictName("District Name");
        districts.setId(123L);
        districts.setStations(new HashSet<>());

        Stations stations = new Stations();
        stations.setBikes(new HashSet<>());
        stations.setCity(cities);
        stations.setDistrict(districts);
        stations.setId(123L);
        stations.setLatitude(10.0d);
        stations.setLongtitude(10.0d);
        stations.setStationAddress("42 Main St");
        stations.setStationName("Station Name");

        Bikes bikes = new Bikes();
        bikes.setBikeName("Bike Name");
        bikes.setId(123L);
        bikes.setOrders(new HashSet<>());
        bikes.setStation(stations);
        bikes.setStatus(true);
        assertThrows(RuntimeException.class, () -> bikesServiceImpl.saveBike(bikes));
        verify(bikesRepository).save((Bikes) any());
    }
}

