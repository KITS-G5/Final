package com.example.ver1.Card.Repository;
import com.example.ver1.Card.Model.Card;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card,Long> {
    @NotNull Page<Card> findAll(@NotNull Pageable pageable);
    Card findCardByCardNum(String cardNum);
    Boolean existsByCardNum(String cardNum);
}
