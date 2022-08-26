package com.example.ver1.Card.Repository;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Customer.Model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {
    Page<Card> findAll(Pageable pageable);

    Optional<Card> findCardByCardNum(String cardNum);

    Boolean existsCardByCardNum(String username);

    //order with the largest card id
    @Query(value = "select a.* from card a join customer b on a.id_customer = b.id where b.phone = :phoneNumber order by a.id desc limit 1", nativeQuery = true)
    Optional<Card> findCardByPhoneNumber(String phoneNumber);

}
