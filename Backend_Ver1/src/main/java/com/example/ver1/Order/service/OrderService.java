package com.example.ver1.Order.service;

import com.example.ver1.Order.Model.Order;
import com.example.ver1.Stations.model.Stations;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();

    Order getOrderById(long id);

    void saveOrder(Order order);

    void updateOrder(Stations station, Order order, long id);

    void deleteOrder(long id);
}
