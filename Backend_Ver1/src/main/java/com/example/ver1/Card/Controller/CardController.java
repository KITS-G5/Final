package com.example.ver1.Card.Controller;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Service.CardService;
import com.example.ver1.Order.Model.ResponseObj;
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

    @GetMapping(path = {"", "/{pageNo}"})
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
    @GetMapping("/cards/user/{cardNum}")
    public Optional<Card> getCardByCardNum(@PathVariable String cardNum) {
        return cardService.getCardByCardNum(cardNum);
    }

    @GetMapping(path = "/cards/{id}")
    Optional<Card> getCardById(@PathVariable long id){
        return cardService.getCardById(id);
    }

    @PostMapping(path = "/cards")
    void addCard(@RequestBody Card card){
        cardService.addCard(card);
    }

    @PutMapping(path = "/cards/{id}")
    void updateCard(@PathVariable long id, @RequestBody Card card){
        cardService.updateCard(id, card);
    }

    @PutMapping(path = "/topUpCard/{cardNum}/{topUpAmount}")
    ResponseObj topUpCard(@PathVariable String cardNum, @PathVariable Double topUpAmount) {
        int i = cardService.topUpCard(topUpAmount, cardNum);
        if(i == 1) {
            return new ResponseObj("OK", "Top up successfully", "");
        }
        return new ResponseObj("Failed", "Can not find card number", "");
    }

    @DeleteMapping(path = "/cards/{id}")
    void deleteCard(@PathVariable long id){
        cardService.deleteCard(id);
    }


    //note: Văn Hải gọi phương thức này. cho tang confirm order. (Chỉ trả về giá trị card của lần mua gần nhất)
    @GetMapping(path = "/cardByPhoneNumber/{phoneNumber}")
    ResponseObj getCardByPhoneNumber(@PathVariable String phoneNumber) {
        Optional<Card> cardByPhoneNumber = cardService.getCardByPhoneNumber(phoneNumber);
        return cardByPhoneNumber.map(card -> new ResponseObj("OK", "Found card number", card)).orElseGet(() -> new ResponseObj("Failed", "Can not find card with this phone number", ""));
    }
}
