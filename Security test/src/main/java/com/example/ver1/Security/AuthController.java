package com.example.ver1.Security;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Repository.CardRepository;
import com.example.ver1.CardAndRole.Model.Role;
import com.example.ver1.CardAndRole.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
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

    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDTO loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getCardNum(), loginDto.getCcv()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDTO signUpDto){
        // add check for username exists in a DB
        if(cardRepository.existsByCardNum(signUpDto.getCardNum())){
            return new ResponseEntity<>("CardNum is already taken!", HttpStatus.BAD_REQUEST);
        }

        // create user object
        Card card = new Card();
        card.setCardNum(signUpDto.getCardNum());
        card.setCardCcv(passwordEncoder.encode(signUpDto.getCcv()));

        Role roles = roleRepository.findByTitle("admin").get();
        card.setRoleCollection(Collections.singleton(roles));

        cardRepository.save(card);

        return new ResponseEntity<>("Card registered successfully", HttpStatus.OK);

    }
}
