package com.example.ver1.Card.Service;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Repository.CardRepository;
import com.example.ver1.CardAndRole.Model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomCardDetailService implements UserDetailsService {
    @Autowired
    private CardRepository cardRepository;

    @Override
    public UserDetails loadUserByUsername(String cardNum) throws UsernameNotFoundException {
        Card card = cardRepository.findCardByCardNum(cardNum)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email:" + cardNum));
        return new org.springframework.security.core.userdetails.User(card.getCardNum(),
                card.getCardPassword(), mapRolesToAuthorities(card.getRoleSet()));
    }

    private Collection< ? extends GrantedAuthority> mapRolesToAuthorities(Set<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getTitle())).collect(Collectors.toList());
    }
}
