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

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
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

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customCardDetailService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("/api/auth/signin/");

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(STATELESS);

        //phần mở all authorization
       // http.authorizeRequests().anyRequest().permitAll();

        //test security
        http.authorizeRequests().antMatchers("/api/auth/signin/", "/refreshTocken").permitAll(); //login
        http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/auth/signup").permitAll(); //buy a new card api
        http.authorizeRequests().antMatchers("/api/v1/**").permitAll(); //buy a new card api
        http.authorizeRequests().antMatchers("/api/v1/*").permitAll(); //buy a new card api
       // http.authorizeRequests().antMatchers("/api/v1/**").permitAll(); //buy a new card api

        http.authorizeRequests().antMatchers(GET, "/api/*").hasAnyAuthority("user");
        http.authorizeRequests().antMatchers("/swagger-ui.html").permitAll();
        http.authorizeRequests().antMatchers("/swagger-ui/").permitAll();
        http.authorizeRequests().antMatchers("/swagger-ui/index.html").permitAll();
        http.authorizeRequests().antMatchers("/api-docs/").permitAll();
        //http.authorizeRequests().antMatchers(POST, "/api/v1/*").hasAnyAuthority("admin");
        http.authorizeRequests().anyRequest().permitAll();

        http.addFilter(customAuthenticationFilter);
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
