package com.example.ver1.Card.Model;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.CardType.Model.CardType;
import com.example.ver1.Customer.Model.Customer;
import com.example.ver1.Order.Model.Order;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Card")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "balance")
    private double balance;

    @ManyToOne
    @JoinColumn(name = "id_card_type")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private CardType cardType;

    @ManyToOne
    @JoinColumn(name = "id_customer")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Customer customer;

    @OneToMany(mappedBy = "card", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Order> orders;
}
