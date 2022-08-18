package com.example.ver1.Customer.Service;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Customer.Model.Customer;
import com.example.ver1.Customer.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImplement implements CustomerService{
    @Autowired
    CustomerRepository customerRepository;

    @Override
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerByCardNumber(Card card) {
        return customerRepository.findCustomerByListCardContaining(card);
    }

    @Override
    public Page<Customer> getAllCustomerByPage(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        return customerRepository.findAll(pageable);
    }

    @Override
    public Optional<Customer> getCustomerById(long id) {
        return customerRepository.findById(id);
    }

    @Override
    public int addCustomer(Customer customer) {
        List<Customer> all = customerRepository.findAll();
        if(!all.contains(customer)){
            customerRepository.save(customer);
            return 1;
        }
        return 0;
    }

    @Override
    public int updateCustomer(long id, Customer customer) {
        Optional<Customer> found = customerRepository.findById(id);
        if(found.isPresent()){
            found.get().setName(customer.getName());
            found.get().setAddress(customer.getAddress());
            found.get().setPhone(customer.getPhone());
            customerRepository.save(found.get());
            return 1;
        }
        return 0;
    }

    @Override
    public int deleteCustomer(long id) {
        Optional<Customer> found = customerRepository.findById(id);
        if(found.isPresent()){
            customerRepository.delete(found.get());
            return 1;
        }
        return 0;
    }

}
