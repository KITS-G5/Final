package com.example.ver1.Order.service;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Stations.model.Stations;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();
    Page<Order> getAllOrderByPage(int pageNo, int pageSize);

    Page<Order> getAllOrderByCardNumber(String cardNum, int pageNo, int pageSize);

    Order getOrderById(long id);

    void saveOrder(Order order);

    void updateOrder(Stations station, Order order, long id);

    void deleteOrder(long id);
}
