package com.example.ver1.CardAndRole.Model;

import com.example.ver1.Card.Model.Card;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "role")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "role_title")
    private String title;

    @ManyToMany(mappedBy = "roleCollection")
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private Collection<Card> cardCollection;
}
