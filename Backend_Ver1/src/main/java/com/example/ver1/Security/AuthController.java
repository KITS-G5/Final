package com.example.ver1.Security;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Repository.CardRepository;
import com.example.ver1.CardAndRole.Model.Role;
import com.example.ver1.CardAndRole.Repository.RoleRepository;
import com.example.ver1.CardType.Model.CardType;
import com.example.ver1.CardType.Repository.CardTypeRepository;
import com.example.ver1.Customer.Model.Customer;
import com.example.ver1.Customer.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired private CardRepository cardRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private CardTypeRepository cardTypeRepository;
    @Autowired private CustomerRepository customerRepository;

    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getCardNum(), loginDto.getCardPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto){
        //create a unique random card number
        while(true) {
            boolean uniqueCardNum = createUniqueCardNum(signUpDto);
            if(uniqueCardNum) {
                break;
            }
        }

        // add check for cardNum exists in a DB
        if(cardRepository.existsCardByCardNum(signUpDto.getCardNum())){
            return new ResponseEntity<>("CardNum is already taken!", HttpStatus.BAD_REQUEST);
        }

        // create user object
        Card card = new Card();
        card.setCardNum(signUpDto.getCardNum());
        card.setBalance(signUpDto.getBalance());
        card.setCardCcv(signUpDto.getCardCcv());
        CardType type = cardTypeRepository.findById(signUpDto.getCardType().getId()).get();
        card.setCardType(type);
        card.setCardPassword(passwordEncoder.encode(signUpDto.getCardPassword()));
        Role roles = roleRepository.findByTitle("user").get();
        card.setRoleSet(Collections.singleton(roles));

        //CREATE Customer who own this card
        //check if customer is exist in database
        Optional<Customer> customerByPhone = customerRepository.findCustomerByPhone(signUpDto.getPhone());
        if(customerByPhone.isPresent()){
            customerByPhone.get().setName(signUpDto.getName());
            customerByPhone.get().setAddress(signUpDto.getAddress());
            card.setCustomer(customerByPhone.get());
            customerRepository.save(customerByPhone.get());
        }
        else {
            Customer customer = new Customer();
            customer.setName(signUpDto.getName());
            customer.setAddress(signUpDto.getAddress());
            customer.setPhone(signUpDto.getPhone());
            card.setCustomer(customer);
            customerRepository.save(customer);
        }

        cardRepository.save(card);
        return new ResponseEntity<>("Card registered successfully", HttpStatus.OK);
    }

    //create a unique and random cardnumber
    boolean createUniqueCardNum(SignUpDto signUpDto){
        StringBuilder stringBuffer = new StringBuilder();
        for(int i = 0; i < 19; i++){
            if(i == 4 || i == 9 || i == 14) {
                stringBuffer.append("-");
                continue;
            }
            int x = (int)(Math.random() * 10);
            stringBuffer.append(x);
        }
        signUpDto.setCardNum(String.valueOf(stringBuffer));
        Card card = new Card();
        card.setCardNum(String.valueOf(stringBuffer));
        List<Card> all = cardRepository.findAll();
        if(all.contains(card)) return false;
        return true;
    }

}
