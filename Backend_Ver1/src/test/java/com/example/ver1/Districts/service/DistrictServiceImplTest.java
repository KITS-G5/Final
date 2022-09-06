package com.example.ver1.Districts.service;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.ver1.Districts.model.Districts;
import com.example.ver1.Districts.repository.DistrictRepository;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {DistrictServiceImpl.class})
@ExtendWith(SpringExtension.class)
class DistrictServiceImplTest {
    @MockBean
    private DistrictRepository districtRepository;

    @Autowired
    private DistrictServiceImpl districtServiceImpl;

    /**
     * Method under test: {@link DistrictServiceImpl#getAllDistricts()}
     */
    @Test
    void testGetAllDistricts() {
        ArrayList<Districts> districtsList = new ArrayList<>();
        when(districtRepository.findAll()).thenReturn(districtsList);
        List<Districts> actualAllDistricts = districtServiceImpl.getAllDistricts();
        assertSame(districtsList, actualAllDistricts);
        assertTrue(actualAllDistricts.isEmpty());
        verify(districtRepository).findAll();
    }

    /**
     * Method under test: {@link DistrictServiceImpl#getAllDistricts()}
     */
    @Test
    void testGetAllDistricts2() {
        when(districtRepository.findAll()).thenThrow(new RuntimeException("An error occurred"));
        assertThrows(RuntimeException.class, () -> districtServiceImpl.getAllDistricts());
        verify(districtRepository).findAll();
    }
}

