package com.example.ver1.Card.Repository;
import com.example.ver1.Card.Model.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {
    Page<Card> findAll(Pageable pageable);

}
