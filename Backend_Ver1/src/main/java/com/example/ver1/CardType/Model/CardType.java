package com.example.ver1.CardType.Model;

import com.example.ver1.Card.Model.Card;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "card_type")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CardType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "card_type")
    private String cardType;

    @OneToMany(mappedBy = "cardType", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private Set<Card> listCard;
}
