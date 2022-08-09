package com.example.ver1.CardType.Service;

import com.example.ver1.CardType.Model.CardType;
import com.example.ver1.CardType.Repository.CardTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardTypeServiceImplement implements CardTypeService{
    @Autowired
    CardTypeRepository cardTypeRepository;

    @Override
    public List<CardType> getAllCardType() {
        return cardTypeRepository.findAll();
    }

    @Override
    public Optional<CardType> getCardById(long id) {
        return cardTypeRepository.findById(id);
    }

    @Override
    public int addCardType(CardType cardType) {
        List<CardType> all = cardTypeRepository.findAll();
        if(!all.contains(cardType)){
            cardTypeRepository.save(cardType);
            return 1;
        }
        return 0;
    }

    @Override
    public int updateCardType(long id, CardType cardType) {
        Optional<CardType> found = cardTypeRepository.findById(id);
        if(found.isPresent()){
            found.get().setCardType(cardType.getCardType());
            cardTypeRepository.save(found.get());
            return 1;
        }
        return 0;
    }

    @Override
    public int deleteCardType(long id) {
        Optional<CardType> found = cardTypeRepository.findById(id);
        if(found.isPresent()){
            cardTypeRepository.delete(found.get());
            return 1;
        }
        return 0;
    }
}
