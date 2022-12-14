package com.example.ver1.Order.Controller;
import com.example.ver1.Card.Model.Card;
import com.example.ver1.Card.Repository.CardRepository;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Order.Model.ResponseObj;
import com.example.ver1.Order.service.OrderService;
import com.example.ver1.Stations.model.Stations;
import com.example.ver1.Stations.service.StationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/orders")
public class Controller {
    @Autowired private OrderService orderService;
    @Autowired private StationsService stationsService;
    @Autowired private CardRepository cardRepository;

    @GetMapping(path = "")
    List<Order> getAllOrderList(){
        return orderService.getAllOrders();
    }
    @GetMapping(path = {"/admin/page/{pageNo}", "/admin/page"})
    Page<Order> getAllOrderListByPage(@PathVariable(required = false) Integer pageNo){
        int pageSize = 20;
        if(pageNo != null) {
            return orderService.getAllOrderByPage(pageNo, pageSize);
        }
        return orderService.getAllOrderByPage(1, pageSize);
    }

    @GetMapping(path = {"/user/{cardNum}/{pageNo}", "/user/{cardNum}"})
    Page<Order> getAllOrderListByUserID(@PathVariable String cardNum, @PathVariable(required = false) Integer pageNo){
        int pageSize = 20;
        if(pageNo != null) {
            return orderService.getAllOrderByCardNumber(cardNum, pageNo, pageSize);
        }
        return orderService.getAllOrderByCardNumber(cardNum, 1, pageSize);
    }

    @GetMapping(path = {"/admin/findById/{id}", "/user/findById/{id}"})
    Order getOrderById(@PathVariable long id){
        return orderService.getOrderById(id);
    }

    @PostMapping(path = "")
    ResponseObj addOrder(@RequestBody Order order){
        Optional<Card> card = cardRepository.findById(order.getCard().getId());
        if(card.isPresent()) {
            Optional<Order> notPaidOrder = orderService.getOrderNotPaid(card.get(), false);
            if(notPaidOrder.isPresent()) {
                return new ResponseObj("Failed", "This card number had an order which is not paid", notPaidOrder.get());
            }
            if(card.get().getCardType().getId() == 2) {
                int i = orderService.saveOrder(order);
                if(i == -1) return new ResponseObj("Failed", "Not valid card", order);
                if(i == 0) return new ResponseObj("Failed", "Card number or cvv not valid", order);
                return new ResponseObj("OK", "Rent bike success", order);
            }
            if(card.get().getBalance() < 1000000){
                return new ResponseObj("Failed", "Card balance must have minimum 1,000,000 VND to start renting", "");
            }
            else {
                int i = orderService.saveOrder(order);
                if(i == -1) return new ResponseObj("Failed", "Not valid card", order);
                if(i == 0) return new ResponseObj("Failed", "Card number or cvv not valid", order);
                return new ResponseObj("OK", "Rent bike success at " + order.getRentingStartedDate() , order);
            }
        }

/*        if(card.isPresent()){
            Optional<Order> notPaidOrder = orderService.getOrderNotPaid(card.get(), false);
            if(notPaidOrder.isPresent()) {
                return new ResponseObj("Failed", "This card number had an order which is not paid", notPaidOrder.get());
            }
            else if(card.get().getBalance() < 1000000){
                return new ResponseObj("Failed", "Card balance must have minimum 1,000,000 VND to start renting", "");
            }
            else {
                int i = orderService.saveOrder(order);
                if(i == -1) return new ResponseObj("Failed", "Not valid card", order);
                if(i == 0) return new ResponseObj("Failed", "Card number or cvv not valid", order);
                return new ResponseObj("OK", "Rent bike success", order);
            }
        }*/
        return new ResponseObj("Failed", "Can not find this card number", "");
    }

    @PutMapping(path = {"/user/{idOrder}/{idStation}", "/admin/{idOrder}/{idStation}"})
    Order updateOrder(@PathVariable long idOrder, @PathVariable long idStation, @RequestBody Order order){
        Stations stations = stationsService.getStationById(idStation);
        Order found = orderService.getOrderById(idOrder);
        if(found != null) {
            orderService.updateOrder(stations, order, idOrder);
        }
        return order;
    }


    // V??n H???i call this method to return a bike, truy???n v??o path m???t id stations (ch??nh l?? return station) v?? body l?? m???t card object
    @PutMapping(path = {"/user/{idStation}", "/admin/{idStation}"})
    ResponseObj updateOrder(@RequestBody Card card, @PathVariable long idStation){
        Stations station = stationsService.getStationById(idStation);
        Optional<Card> card1 = cardRepository.findById(card.getId());
        if(card1.isPresent()){
            if(!Objects.equals(card1.get().getCardCcv(), card.getCardCcv()) || !card1.get().getCardNum().equals(card.getCardNum())) {
                return new ResponseObj("Failed", "Wrong card number or cvv number", "");
            }
            int check = orderService.updateOrder(card1.get(), station);
            if(check == -1) return new ResponseObj("Failed", "All payment are made", "");
            if(check == 0) return new ResponseObj("Payment failed", "Return bike success, payment failed(not enough money)", "");
            if(check == 1){
                //get order detail here
                Optional<Order> latestOrderByCard = orderService.getLatestOrderByCard(card1.get());
                return new ResponseObj("OK", "Make payment success. You paid " + latestOrderByCard.get().getTotalFee() + " VND", latestOrderByCard.get());
            }
        }
        return new ResponseObj("Failed", "Not found card information", "");
    }

    // h?? h???i call this method and payment status auto update to true
    @PutMapping(path = {"/user/makePayment/{cardNum}"})
    ResponseObj updatePayment(@PathVariable String cardNum) {
        Optional<Card> found = cardRepository.findCardByCardNum(cardNum);
        if(found.isPresent()) {
            orderService.makePayment(found.get());
            return new ResponseObj("OK", "Paid order", found.get());
        }
        return new ResponseObj("Failed", "Not found unpaid order", "");
    }

    @GetMapping(path = "/admin/grossRevenueByDate")
    String totalRevenueByDate(@RequestParam(required = false, value = "date1")String date1, @RequestParam(required = false, value = "date2") String date2)
    {
        double v;
        DecimalFormat df = new DecimalFormat("0.00");

        if(date1 == null && date2 == null){
            v = orderService.totalRevenueByDate(new Date(), new Date());
        }
        else {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Date date11 = simpleDateFormat.parse(date1);
                Date date22 = simpleDateFormat.parse(date2);
                v = orderService.totalRevenueByDate(date11, date22);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        return df.format(v);
    }

    @GetMapping(path = "/admin/netRevenueByDate")
    String netRevenueByDate(@RequestParam(required = false, value = "date1")String date1, @RequestParam(required = false, value = "date2") String date2)
    {
        double v;
        DecimalFormat df = new DecimalFormat("0.00");

        if(date1 == null && date2 == null){
            v = orderService.netRevenueByDate(new Date(), new Date());
        }
        else {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Date date11 = simpleDateFormat.parse(date1);
                Date date22 = simpleDateFormat.parse(date2);
                v = orderService.netRevenueByDate(date11, date22);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        return df.format(v);
    }

    @GetMapping(path = "/admin/notPaidRevenueByDate")
    String notPaidRevenueByDate(@RequestParam(required = false, value = "date1")String date1, @RequestParam(required = false, value = "date2") String date2)
    {
        double v;
        DecimalFormat df = new DecimalFormat("0.00");

        if(date1 == null && date2 == null){
            v = orderService.notPaidRevenueByDate(new Date(), new Date());
        }
        else {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Date date11 = simpleDateFormat.parse(date1);
                Date date22 = simpleDateFormat.parse(date2);
                v = orderService.notPaidRevenueByDate(date11, date22);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        return df.format(v);
    }

    @GetMapping(path = "admin/findOrdersByMonthAndYear")
    List<Order> getOrdersByMonthAndYear(@RequestParam(value = "month", required = false) String month,
                                        @RequestParam(value = "year", required = false) String year){
        List<Order> list;
        if(month == null && year == null){
            Date thisMonth = new Date();
            int month1 = thisMonth.getMonth();
            int year1 = thisMonth.getYear();
            list = orderService.getOrdersByMonthAndYear(String.valueOf(month1), String.valueOf(year1));
        } else {
            list = orderService.getOrdersByMonthAndYear(month, year);
        }
        return list;
    }
    @GetMapping(path = "admin/sumTotalByMonthGroupByDate")
    List<Object[]> sumTotalByMonthGroupByDate(@RequestParam(value = "month", required = false) String month,
                                              @RequestParam(value = "year", required = false) String year) {
        List<Object[]> list = null;
        List<Object[]> listRev = null;
        Date thisMonth = new Date();
        int getMonth = thisMonth.getMonth();
        int getYear = thisMonth.getYear();
        String month1 = String.valueOf(getMonth);
        String year1 = String.valueOf(getYear);
        int[] dateInMonth = new int[31];
        if (month != null && year != null) {
            month1 = month;
            year1 = year;
            listRev = orderService.sumTotalByMonthAndYear(month, year);
        } else {
            listRev = orderService.sumTotalByMonthAndYear(month1, year1);
        }

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, Integer.parseInt(month1));
        calendar.set(Calendar.YEAR, Integer.parseInt(year1));

        int daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        for (int i = 0; i <= daysInMonth; i++) {
            dateInMonth[i] = i + 1;
        }
        list = new ArrayList<Object[]>();
        for (int i = 0; i < dateInMonth.length; i++) {
            Object[] obj = new Object[2];
            obj[0] = dateInMonth[i];
            obj[1] = 0;
            list.add(obj);
        }
        if (listRev != null) {
            for (int j = 0; j < listRev.size(); j++) {
                for (int i = 0; i < dateInMonth.length; i++) {
                    if (String.valueOf(dateInMonth[i]).equals(String.valueOf(listRev.get(j)[1]))) {
                        list.get(i)[1] = listRev.get(j)[0];
                    }
                }

            }

        }
        return list;

    }
}
