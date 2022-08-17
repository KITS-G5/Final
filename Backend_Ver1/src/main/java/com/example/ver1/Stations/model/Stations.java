package com.example.ver1.Stations.model;
import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Cities.model.Cities;
import com.example.ver1.Districts.model.Districts;
import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "stations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Stations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "station_name")
    private String stationName;

    @Column(name = "station_address")
    private String stationAddress;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longtitude")
    private Double longtitude;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "city_id", nullable = false)
    private Cities city;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "district_id", nullable = false)
    private Districts district;

    @OneToMany(mappedBy = "station", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Bikes> bikes;
}
