package com.example.ver1.Security.Filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@CrossOrigin
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl("/api/auth/signin/"); // new added
    }

//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//      /*  String cardNum = request.getParameter("cardNum");
//        String cardPassword = request.getParameter("cardPassword");*/
//
//        String cardNum;
//        String cardPassword;
//        Map<String, String> requestMap = null;
//        try {
//            requestMap = new ObjectMapper().readValue(request.getInputStream(), Map.class);
//            cardNum = requestMap.get("cardNum");
//            cardPassword = requestMap.get("cardPassword");
//        } catch (IOException e) {
//            throw new AuthenticationServiceException(e.getMessage(), e);
//        }
//
//        log.info("Card number is {}", cardNum);
//        log.info("Password is {}", cardPassword);
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(cardNum, cardPassword);
//        return authenticationManager.authenticate(authenticationToken);
//    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        //User class from spring security
        User user = (User) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String access_tocken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .withIssuer(request.getRequestURI().toString())
                .withClaim("roles", user.getAuthorities()
                        .stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())).sign(algorithm);

        String refresh_tocken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                .withIssuer(request.getRequestURI().toString()).sign(algorithm);

//        response.setHeader("access_tocken", access_tocken);
//        response.setHeader("refresh_tocken", refresh_tocken);
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_tocken", access_tocken);
        tokens.put("refresh_tocken", refresh_tocken);

        tokens.put("username", user.getUsername());
        tokens.put("role", (user.getAuthorities()).toString());

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

}
