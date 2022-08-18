package com.example.ver1.Customer.Service;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Customer.Model.Customer;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> getAllCustomer();
    Optional<Customer> getCustomerByCardNumber(Card card);

    Page<Customer> getAllCustomerByPage(int pageNo, int pageSize);
    Optional<Customer> getCustomerById(long id);
    int addCustomer(Customer customer);
    int updateCustomer(long id, Customer customer);
    int deleteCustomer(long id);
}
