package com.example.ver1.Cities.model;

import com.example.ver1.Districts.model.Districts;
import com.example.ver1.Stations.model.Stations;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "cities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "city_name")
    private String cityName;

    @OneToMany(mappedBy = "city", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Stations> stations;

    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Districts> districts;
}
