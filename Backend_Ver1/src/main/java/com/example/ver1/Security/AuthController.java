package com.example.ver1.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Repository.CardRepository;
import com.example.ver1.CardAndRole.Model.Role;
import com.example.ver1.CardAndRole.Repository.RoleRepository;
import com.example.ver1.CardType.Model.CardType;
import com.example.ver1.CardType.Repository.CardTypeRepository;
import com.example.ver1.Customer.Model.Customer;
import com.example.ver1.Customer.Repository.CustomerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CardTypeRepository cardTypeRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getCardNum(), loginDto.getCardPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("Card number signed-in successfully!.", HttpStatus.OK);
    }
    @GetMapping("/refreshTocken")
    public void refreshTocken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);

                String cardNum = decodedJWT.getSubject();
                Card card = cardRepository.findCardByCardNum(cardNum).get();

                String access_tocken = JWT.create()
                        .withSubject(card.getCardNum())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURI().toString())
                        .withClaim("roles", card.getRoleSet()
                                .stream().map(Role::getTitle).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_tocken" , access_tocken);
                tokens.put("refresh_tocken" , refresh_token);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception exception) {
                log.error("Error message in: {}", exception.getMessage());
                response.setHeader("Error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("E rror_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh tocken is missing");
        }
    }

/*
    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDto loginDto) {
        CustomAuthenticationFilter authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getCardNum(), loginDto.getCardPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("Card number signed-in successfully!.", HttpStatus.OK);
    }
*/

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto) {
        //create a unique random card number
        while (true) {
            boolean uniqueCardNum = createUniqueCardNum(signUpDto);
            if (uniqueCardNum) {
                break;
            }
        }

        // add check for cardNum exists in a DB
        if (cardRepository.existsCardByCardNum(signUpDto.getCardNum())) {
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
        if (customerByPhone.isPresent()) {
            customerByPhone.get().setName(signUpDto.getName());
            customerByPhone.get().setAddress(signUpDto.getAddress());
            card.setCustomer(customerByPhone.get());
            customerRepository.save(customerByPhone.get());
        } else {
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

    //create a unique and random card number
    boolean createUniqueCardNum(SignUpDto signUpDto) {
        StringBuilder stringBuffer = new StringBuilder();
        for (int i = 0; i < 19; i++) {
            if (i == 4 || i == 9 || i == 14) {
                stringBuffer.append("-");
                continue;
            }
            int x = (int) (Math.random() * 10);
            stringBuffer.append(x);
        }
        signUpDto.setCardNum(String.valueOf(stringBuffer));
        Card card = new Card();
        card.setCardNum(String.valueOf(stringBuffer));
        List<Card> all = cardRepository.findAll();
        if (all.contains(card)) return false;
        return true;
    }

}
