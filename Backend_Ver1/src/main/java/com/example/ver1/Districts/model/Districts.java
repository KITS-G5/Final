package com.example.ver1.Districts.model;

import com.example.ver1.Cities.model.Cities;
import com.example.ver1.Stations.model.Stations;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "districts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Districts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "district_name")
    private String districtName;

    @OneToMany(mappedBy = "district", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Stations> stations;

    @ManyToOne(optional = false)
    @JoinColumn(name = "city_id", nullable = false)
    private Cities city;
}
