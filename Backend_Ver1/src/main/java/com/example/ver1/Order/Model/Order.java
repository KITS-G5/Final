package com.example.ver1.Order.Model;
import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Card.Model.Card;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.util.Date;

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

    @ManyToOne(optional = false)
    @JoinColumn(name = "card_id")
    private Card card;

    @ManyToOne(optional = false)
    @JoinColumn(name = "bike_id")
    private Bikes bike;

    @Basic
    @Column(name = "rent_start_date", updatable = false)
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date rentingStartedDate;

    @Basic
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "rend_end_date")
    @UpdateTimestamp
    private Date rentingEndDate;

    private Float totalFee = 3000.00f; //customer will be charged 3000 VND immediately when order created

    @Column(name = "payment_status", nullable = false)
    private boolean paymentStatus = false;

    @Column(name = "return_status", nullable = false)
    private boolean returnStatus = false;

    public Order(Card card, Bikes bike) {
        this.card = card;
        this.bike = bike;
    }
}