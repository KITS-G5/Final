package com.example.ver1.Security;

import com.example.ver1.Card.Service.CustomCardDetailService;
import com.example.ver1.Security.Filter.CustomAuthenticationFilter;
import com.example.ver1.Security.Filter.CustomAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired private CustomCardDetailService customCardDetailService;

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customCardDetailService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
//        customAuthenticationFilter.setFilterProcessesUrl("/api/auth/signin/");

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);

        //phần mở all authorization
        //http.authorizeRequests().anyRequest().permitAll();

        //authentication controller
        http.authorizeRequests().antMatchers(POST,"/api/auth/signin/", "/refreshTocken").permitAll(); //login
        http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/auth/signup").permitAll(); //buy a new card api or signup
        http.authorizeRequests().antMatchers("/error").permitAll();

        http.authorizeRequests().antMatchers("/error").permitAll();

        //bikes controller
        http.authorizeRequests().antMatchers(GET, "/api/v1/bikes").permitAll();
        http.authorizeRequests().antMatchers(GET, "/api/v1/bikes/**").permitAll();
        http.authorizeRequests().antMatchers(GET, "/api/v1/station/bikes/*").permitAll();
        http.authorizeRequests().antMatchers(POST, "/api/v1/bikes").hasAnyAuthority("admin");
        http.authorizeRequests().antMatchers(DELETE, "/api/v1/bikes/*").hasAnyAuthority("admin");

        //Station controller
        http.authorizeRequests().antMatchers(GET,"/api/v1/stations/").permitAll(); //
        http.authorizeRequests().antMatchers(GET,"/api/v1/station/**").permitAll(); //
        http.authorizeRequests().antMatchers(POST,"/api/v1/station/").hasAnyAuthority("admin"); //
        http.authorizeRequests().antMatchers(PUT,"/api/v1/station/**").hasAnyAuthority("admin"); //
        http.authorizeRequests().antMatchers(DELETE,"/api/v1/station/**").hasAnyAuthority("admin"); //


        //Card controller
        http.authorizeRequests().antMatchers(GET, "/api/v1/cards").permitAll();
        http.authorizeRequests().antMatchers(GET, "/api/v1/cards/user/**").permitAll();
        http.authorizeRequests().antMatchers(GET,"/api/v1/cardByPhoneNumber/**").permitAll(); //
        http.authorizeRequests().antMatchers(GET,"/api/v1").hasAnyAuthority("user"); //
        http.authorizeRequests().antMatchers(GET,"/api/v1/**").hasAnyAuthority("user"); //
        http.authorizeRequests().antMatchers(POST,"/api/v1/cards").hasAnyAuthority("admin"); //
        http.authorizeRequests().antMatchers(PUT,"/api/v1/cards/*").hasAnyAuthority("admin"); //
        http.authorizeRequests().antMatchers(PUT,"/api/v1/topUpCard/**").permitAll(); //


        //card type controller
        http.authorizeRequests().antMatchers(GET, "/card-type").hasAnyAuthority("user");
        http.authorizeRequests().antMatchers(POST, "/card-type").hasAnyAuthority("admin");
        http.authorizeRequests().antMatchers(GET, "/card-type/*").hasAnyAuthority("user");
        http.authorizeRequests().antMatchers(PUT, "/card-type/*").hasAnyAuthority("admin");
        http.authorizeRequests().antMatchers(DELETE, "/card-type/*").hasAnyAuthority("admin");

        //district controller
//        http.authorizeRequests().antMatchers(GET, "/api/v1/districts/").permitAll();
        http.authorizeRequests().antMatchers(GET, "/api/v1/districts/").hasAnyAuthority("admin");

        //cities controller
        http.authorizeRequests().antMatchers(GET, "/api/v1/cities").hasAnyAuthority("admin");
        http.authorizeRequests().antMatchers(GET, "/api/v1/cities").hasAnyAuthority("user");
//        http.authorizeRequests().antMatchers(GET, "/api/v1/cities").permitAll();


        //orders controller
        http.authorizeRequests().antMatchers(GET, "/orders").permitAll();
        http.authorizeRequests().antMatchers(GET,"/orders/admin/**").hasAnyAuthority("admin");
        http.authorizeRequests().antMatchers(GET, "/orders/user/**").permitAll();
        http.authorizeRequests().antMatchers(PUT, "/orders/user/**").permitAll();
        http.authorizeRequests().antMatchers( POST,"/orders").permitAll();
        http.authorizeRequests().antMatchers( "/orders").hasAnyAuthority("admin");
        http.authorizeRequests().antMatchers( "/orders/**").hasAnyAuthority("admin");
        http.authorizeRequests().antMatchers( GET,"/orders/**").hasAnyAuthority("user");
        http.authorizeRequests().antMatchers( PUT,"/user?**").permitAll();
        http.authorizeRequests().antMatchers( PUT,"/user?**").hasAnyAuthority("user");

        http.authorizeRequests().antMatchers(GET, "/api/*").hasAnyAuthority("user");
        http.authorizeRequests().antMatchers("/swagger-ui.html").permitAll();
        http.authorizeRequests().antMatchers("/swagger-ui/").permitAll();
        http.authorizeRequests().antMatchers("/swagger-ui/index.html").permitAll();
        http.authorizeRequests().antMatchers("/api-docs/").permitAll();
        http.authorizeRequests().anyRequest().permitAll();

//        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class); //lop filter kiem tra request
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    //    @Override
//    @Bean
//    protected UserDetailsService userDetailsService() {
//        UserDetails ramesh = User.builder().username("ramesh").password(passwordEncoder()
//                .encode("password")).roles("USER").build();
//        UserDetails admin = User.builder().username("admin").password(passwordEncoder()
//                .encode("admin")).roles("ADMIN").build();
//        return new InMemoryUserDetailsManager(ramesh, admin);
//    }
}
