package com.example.ver1.Customer.Repository;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Customer.Model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Page<Customer> findAll(Pageable pageable);

    Optional<Customer> findCustomerByPhone(String phone);

    Optional<Customer> findCustomerByListCardContaining(Card card);
}
