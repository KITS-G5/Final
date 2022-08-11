package com.example.ver1.Order.service;

import com.example.ver1.Order.Model.Order;
import com.example.ver1.Order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(long id) {
        Optional<Order> optional = orderRepository.findById(id);
        Order o = null;
        if (optional.isPresent()) {
            o = optional.get();
        } else {
            throw new RuntimeException("No such order exists");
        }
        return o;
    }

    @Override
    public void saveOrder(Order order) {
        Order o = new Order();
        o.setCard(order.getCard());
        o.setBike(order.getBike());
        o.setRentingStartedDate(LocalDateTime.now());
        o.setRentingEndDate(null);
        o.setTotalFee(null);
        o.setPaymentStatus(false);
        orderRepository.save(o);
    }

    @Override
    public void updateOrder(Order order, long id) {
        Optional<Order> optional = orderRepository.findById(id);
        Order o = null;
        if (optional.isPresent()) {
            o = optional.get();
            o.setCard(order.getCard());
            o.setBike(o.getBike());
            o.setRentingEndDate(LocalDateTime.now());
            o.setTotalFee((float) Duration.between(o.getRentingStartedDate(), order.getRentingEndDate()).toMinutes() * (2000/60));
            o.setPaymentStatus(true);
            orderRepository.save(o);
        } else {
            throw new RuntimeException("Order does not exists");
        }
    }

    @Override
    public void deleteOrder(long id) {
        Optional<Order> optional = orderRepository.findById(id);
        if (optional.isPresent()) {
            orderRepository.deleteById(id);
        } else {
            throw new RuntimeException("Order does not exists");
        }
    }
}
