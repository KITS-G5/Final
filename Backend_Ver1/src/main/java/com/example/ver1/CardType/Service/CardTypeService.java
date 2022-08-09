package com.example.ver1.CardType.Service;

import com.example.ver1.CardType.Model.CardType;

import java.util.List;
import java.util.Optional;

public interface CardTypeService {
    List<CardType> getAllCardType();
    Optional<CardType> getCardById(long id);
    int addCardType(CardType cardType);
    int updateCardType(long id, CardType cardType);
    int deleteCardType(long id);
}
