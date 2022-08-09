package com.example.ver1.CardType.Repository;

import com.example.ver1.CardType.Model.CardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardTypeRepository extends JpaRepository<CardType, Long> {
}
