package com.example.ver1.Card.Model;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.CardAndRole.Model.Role;
import com.example.ver1.CardType.Model.CardType;
import com.example.ver1.Customer.Model.Customer;
import com.example.ver1.Order.Model.Order;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;
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
    private Long id;
    @Column(name = "balance", nullable = false)
    private double balance;

    @Column(name = "card_num", length = 20, unique = true, nullable = false, updatable = false)
    private String cardNum;

    @Column(name = "card_password", length = 20, nullable = false)
    private String cardPassword;

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

    @OneToMany(mappedBy = "card")
    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<Order> ordersList;


    @ManyToMany
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinTable(name = "card_and_role",
            joinColumns = @JoinColumn(name = "card_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roleSet;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Card card = (Card) o;
        return Objects.equals(cardNum, card.cardNum);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cardNum);
    }

}
