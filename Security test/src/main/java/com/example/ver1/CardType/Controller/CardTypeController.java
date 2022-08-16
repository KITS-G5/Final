package com.example.ver1.CardType.Controller;

import com.example.ver1.CardType.Model.CardType;
import com.example.ver1.CardType.Service.CardTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/card-type"
)
public class CardTypeController {
    @Autowired
    CardTypeService cardTypeService;

    @GetMapping(path = "")
    List<CardType> getAllCardType(){
        return cardTypeService.getAllCardType();
    }

    @GetMapping(path = "{id}")
    Optional<CardType> getCardType(@PathVariable long id){
        return cardTypeService.getCardById(id);
    }

    @PostMapping(path = "")
    void addCardType(@RequestBody CardType cardType){
        cardTypeService.addCardType(cardType);
    }

    @PutMapping(path = "{id}")
    void updateCardType(@PathVariable long id, @RequestBody CardType cardType){
        cardTypeService.updateCardType(id, cardType);
    }

    @DeleteMapping(path = "{id}")
    void deleteCardType(@PathVariable long id){
        cardTypeService.deleteCardType(id);
    }
}
