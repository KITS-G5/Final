package com.example.ver1.Order.service;

import com.example.ver1.Bikes.model.Bikes;
import com.example.ver1.Bikes.repository.BikesRepository;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Repository.CardRepository;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Order.repository.OrderRepository;
import com.example.ver1.Stations.model.Stations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    public Page<Order> getAllOrderByPage(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize - 1);
        return orderRepository.findAll(pageable);
    }

    @Override
    public Optional<Order> getOrderNotPaid(Card card, boolean paymentStatus) {
        return orderRepository.findOrderByCardAndPaymentStatus(card, paymentStatus);
    }

    @Override
    public Page<Order> getAllOrderByCardNumber(String cardNum, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Optional<Card> cardByCardNum = cardRepository.findCardByCardNum(cardNum);
        if(cardByCardNum.isPresent()){
            return orderRepository.findOrdersByCard(cardByCardNum.get(), pageable);
        }
        return null;
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
    public int saveOrder(Order order) {
        Optional<Card> card = cardRepository.findById(order.getCard().getId());
        Optional<Bikes> bikes = bikesRepository.findById(order.getBike().getId());
        if(card.isPresent() && bikes.isPresent()){
            if(card.get().getCardNum().equals(order.getCard().getCardNum()) && card.get().getCardCcv().equals(order.getCard().getCardCcv())) {
                //this bike status return to false while it is still renting
                bikes.get().setStatus(false);
                order.setBike(bikes.get());
                order.setCard(card.get());
                orderRepository.save(order);
                bikesRepository.save(bikes.get());
                return 1;
            }
            else {
                return 0;
            }
        }
        return -1;
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
            if(card.getId() == 1) {
                if(fee > card.getBalance()){
                    //payment failed
                    o.setPaymentStatus(false);
                } else {
                    //payment success
                    o.setPaymentStatus(true);
                    card.setBalance(card.getBalance() - fee);
                }
            } else {
                o.setPaymentStatus(true);
            }

            orderRepository.save(o);
            cardRepository.save(card);
        } else {
            throw new RuntimeException("Order does not exists");
        }
    }


    //return bike call this method for Van Hai
    @Override
    public int updateOrder(Card card, Stations station) {
        Optional<Order> optional = orderRepository.findOrderByCardAndPaymentStatus(card, false);
        Order o = null;
        if (optional.isPresent()) {
            o = optional.get();

            //check if this bike had been returned
            if(!o.isReturnStatus()) {
                o.getBike().setStation(station); //save new station id to the bike
                o.getBike().setStatus(true); //the bike now is available for rent
                o.setReturnStatus(true);
                orderRepository.save(o);
            }

            //save fee to order
            float fee = calculateFee(o);
            o.setTotalFee(fee);

            //subtract balance from card
            if(card.getCardType().getId() == 1) { //khi card là prepaid
                if(fee > card.getBalance()){
                    //payment failed
                    o.setPaymentStatus(false);
                    orderRepository.save(o);
                    return 0;
                } else {
                    //payment success
                    o.setPaymentStatus(true);
                    card.setBalance(card.getBalance() - fee);
                    orderRepository.save(o);
                    cardRepository.save(card);
                    return 1;
                }
            } else { //khi card la postpaid
                o.setPaymentStatus(true);
                orderRepository.save(o);
                return 1;
            }

        }
        return -1;
    }

    @Override
    public int makePayment(Card card) {
        Optional<Order> found = orderRepository.findOrderByCardAndPaymentStatusAndReturnStatus(card, false, true);
        if(found.isPresent()) {
            found.get().setPaymentStatus(true);
            orderRepository.save(found.get());
            return 1;
        } else return 0;
    }

    //calculate bike rental fee when customer return the bike
    float calculateFee(Order order){
        int rentHours = (int) Math.ceil ((order.getRentingEndDate().getTime() - order.getRentingStartedDate().getTime()) / 3600000);
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

    @Override
    public double totalRevenueByDate(Date date1, Date date2) {
        Double rev = orderRepository.totalRevenueByDate(date1, date2);
        if(rev == null) {
            return 0;
        }
        return rev;
    }

    @Override
    public double netRevenueByDate(Date date1, Date date2) {
        Double rev = orderRepository.netRevenueByDate(date1, date2);
        if(rev == null) {
            return 0;
        }
        return rev;
    }

    @Override
    public double notPaidRevenueByDate(Date date1, Date date2) {
        Double rev = orderRepository.notPaidRevenueByDate(date1, date2);
        if(rev == null) return 0;
        return rev;
    }

    @Override
    public List<Order> getOrdersByMonthAndYear(String month, String year) {
        return orderRepository.findOrdersByMonthAndYear(month, year);
    }

}
