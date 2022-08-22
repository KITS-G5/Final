package com.example.ver1.Order.service;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Stations.model.Stations;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<Order> getAllOrders();
    Page<Order> getAllOrderByPage(int pageNo, int pageSize);

    Optional<Order> getOrderNotPaid(Card card, boolean paymentStatus);

    Page<Order> getAllOrderByCardNumber(String cardNum, int pageNo, int pageSize);

    Order getOrderById(long id);

    void saveOrder(Order order);

    void updateOrder(Stations station, Order order, long id);
    int updateOrder(Card card, Stations stations);

    void deleteOrder(long id);

    double totalRevenueByDate(Date date1, Date date2);
    double netRevenueByDate(Date date1, Date date2);
    double notPaidRevenueByDate(Date date1, Date date2);

    List<Order> getOrdersByMonthAndYear(String month, String year);
}
