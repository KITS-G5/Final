package com.example.ver1.Card.Service;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CardServiceImplement implements CardService {
    @Autowired
    private CardRepository cardRepository;

    @Override
    public List<Card> getAllCard() {
        return cardRepository.findAll();
    }

    @Override
    public Page<Card> getAllCard(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        return cardRepository.findAll(pageable);
    }

    @Override
    public Optional<Card> getCardById(long id) {
        return cardRepository.findById(id);
    }

    @Override
    public Optional<Card> getCardByPhoneNumber(String phoneNumber) {
        return cardRepository.findCardByPhoneNumber(phoneNumber);
    }

    @Override
    public Optional<Card> getCardByCardNum(String cardNUm) {
        return cardRepository.findCardByCardNum(cardNUm);
    }

    @Override
    public int addCard(Card card) {
        List<Card> all = cardRepository.findAll();
        if(!all.contains(card)){
            cardRepository.save(card);
            return 1;
        }
        return 0;
    }

    @Override
    public int updateCard(long id, Card card) {
        Optional<Card> found = cardRepository.findById(id);
        if(found.isPresent()){
            // found.get().setCardType(card.getCardType());
            found.get().setBalance(card.getBalance());
            cardRepository.save(found.get());
            return 1;
        }
        return 0;
    }

    @Override
    public int topUpCard(double topUpAmount, String cardNum) {
        Optional<Card> found = cardRepository.findCardByCardNum(cardNum);
        if(found.isPresent()){
            found.get().setBalance(topUpAmount + found.get().getBalance());
            cardRepository.save(found.get());
            return 1;
        }
        return 0;
    }

    @Override
    public int deleteCard(long id) {
        Optional<Card> found = cardRepository.findById(id);
        if(found.isPresent()){
            cardRepository.delete(found.get());
            return 1;
        }
        return 0;
    }
}
