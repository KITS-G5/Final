package com.example.ver1.Order.service;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Order.repository.OrderRepository;
import com.example.ver1.Stations.model.Stations;
import com.example.ver1.Stations.service.StationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        orderRepository.save(order);
    }
    @Override
    public void updateOrder(Stations station, Order order, long id) {
        Optional<Order> optional = orderRepository.findById(id);
        Order o = null;
        if (optional.isPresent()) {
            o = optional.get();
            o.getBike().setStation(station); //save new station id

            o.setPaymentStatus(true);
            orderRepository.save(o);

            //save fee to order
            float fee = calculateFee(order);
            order.setTotalFee(fee);

            //subtract balance from card
            Card card = order.getCard();
            if(fee > card.getBalance()){
                //payment failed
                order.setPaymentStatus(false);
            } else {
                order.setPaymentStatus(true);
                card.setBalance(card.getBalance() - fee);
            }
            orderRepository.save(order);
        } else {
            throw new RuntimeException("Order does not exists");
        }
    }

    float calculateFee(Order order){
        long rentHours = (order.getRentingEndDate().getTime() - order.getRentingStartedDate().getTime()) / 3600000;
        return order.getTotalFee() + 2000 * rentHours;
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
