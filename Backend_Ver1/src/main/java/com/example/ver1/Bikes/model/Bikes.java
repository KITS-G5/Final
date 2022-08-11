package com.example.ver1.Bikes.model;

import com.example.ver1.Order.Model.Order;
import com.example.ver1.Stations.model.Stations;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "bikes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "bike_name")
    private String bikeName;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "station_id", nullable = false)
    private Stations station;

    @Column(name = "status")
    private Boolean status;

    @OneToMany(mappedBy = "bike", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Order> orders;
}
