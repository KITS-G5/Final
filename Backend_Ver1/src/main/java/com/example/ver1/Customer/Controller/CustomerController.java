package com.example.ver1.Customer.Controller;

import com.example.ver1.Customer.Model.Customer;
import com.example.ver1.Customer.Service.CustomerService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @GetMapping(path = {"/{pageNo}", ""})
    Page<Customer> getAllCustomer(@PathVariable(required = false) Integer pageNo){
        int pageSize = 20;
        if(pageNo != null) {
            return customerService.getAllCustomerByPage(pageNo, pageSize);
        }
        return customerService.getAllCustomerByPage(1, pageSize);
    }

    @GetMapping(path = "{id}")
    Optional<Customer> getCustomerById(@PathVariable long id){
        return customerService.getCustomerById(id);
    }

    @PostMapping(path = "")
    void addCustomer(@RequestBody Customer customer){
        customerService.addCustomer(customer);
    }

    @DeleteMapping(path = "{id}")
    void deleteCustomer(@PathVariable long id){
        customerService.deleteCustomer(id);
    }
}
