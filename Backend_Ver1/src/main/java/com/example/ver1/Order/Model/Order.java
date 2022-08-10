package com.example.ver1.Order.Model;

import com.example.ver1.Card.Model.Card;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "tbl_order")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Card card;

    @ManyToOne

    private Date rentingStartedDate;
    private Date rentingEndDate;
    private float totalFee;
    private boolean paymentStatus;
}

