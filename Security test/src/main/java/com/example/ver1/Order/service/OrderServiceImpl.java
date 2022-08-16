package com.example.ver1.Order.service;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Bikes.repository.BikesRepository;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Repository.CardRepository;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Order.repository.OrderRepository;
import com.example.ver1.Stations.model.Stations;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired private OrderRepository orderRepository;
    @Autowired private CardRepository cardRepository;
    @Autowired private BikesRepository bikesRepository;
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
    public void saveOrder(@NotNull Order order) {
        Optional<Card> card = cardRepository.findById(order.getCard().getId());
        Optional<Bikes> bikes = bikesRepository.findById(order.getBike().getId());
        if(card.isPresent() && bikes.isPresent()){
            //this bike status return to false while it is still renting
            bikes.get().setStatus(false);
            order.setBike(bikes.get());
            order.setCard(card.get());
        }
        orderRepository.save(order);
    }
    @Override
    public void updateOrder(Stations station, Order order, long id) {
        Optional<Order> optional = orderRepository.findById(id);
        Order o = null;
        if (optional.isPresent()) {
            o = optional.get();
            o.getBike().setStation(station); //save new station id to the bike
            o.getBike().setStatus(true); //the bike now is available for rent
            o.setReturnStatus(true);
            orderRepository.save(o);

            //save fee to order
            float fee = calculateFee(o);
            o.setTotalFee(fee);

            //subtract balance from card
            Card card = o.getCard();
            if(fee > card.getBalance()){
                //payment failed
                o.setPaymentStatus(false);
            } else {
                //payment success
                o.setPaymentStatus(true);
                card.setBalance(card.getBalance() - fee);
            }
            orderRepository.save(o);
            cardRepository.save(card);
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
