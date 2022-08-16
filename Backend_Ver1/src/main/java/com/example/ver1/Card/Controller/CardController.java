package com.example.ver1.Card.Controller;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class CardController {
    @Autowired
    CardService cardService;

    @GetMapping(path = {"", "/pageNo"})
    Page<Card> getAllCard(@PathVariable(required = false) Integer pageNo){
        int pageSize = 20;
        if(pageNo != null){
            return cardService.getAllCard(pageNo, pageSize);
        }
        return cardService.getAllCard(1, pageSize);
    }

    @GetMapping("/cards")
    public List<Card> getAllCards() {
        return cardService.getAllCard();
    }


    @GetMapping(path = "{id}")
    Optional<Card> getCardById(@PathVariable long id){
        return cardService.getCardById(id);
    }

    @PostMapping(path = "")
    void addCard(@RequestBody Card card){
        cardService.addCard(card);
    }

    @PutMapping(path = "{id}")
    void updateCard(@PathVariable long id, @RequestBody Card card){
        cardService.updateCard(id, card);
    }

    @DeleteMapping(path = "{id}")
    void deleteCard(@PathVariable long id){
        cardService.deleteCard(id);
    }
}
