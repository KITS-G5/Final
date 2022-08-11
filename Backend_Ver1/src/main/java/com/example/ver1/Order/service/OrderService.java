package com.example.ver1.Order.service;

import com.example.ver1.Order.Model.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();

    Order getOrderById(long id);

    void saveOrder(Order order);

    void updateOrder(Order order, long id);

    void deleteOrder(long id);
}
