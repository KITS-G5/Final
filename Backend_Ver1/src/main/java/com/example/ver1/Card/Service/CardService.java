package com.example.ver1.Card.Service;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Customer.Model.Customer;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface CardService {
    List<Card> getAllCard();
    Page<Card> getAllCard(int pageNo, int pageSize);
    Optional<Card> getCardById(long id);
    int addCard(Card card);
    int updateCard(long id, Card card);
    int deleteCard(long id);
}
