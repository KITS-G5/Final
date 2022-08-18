package com.example.ver1.Order.Controller;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Order.service.OrderService;
import com.example.ver1.Stations.model.Stations;
import com.example.ver1.Stations.service.StationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/orders")
public class Controller {
    @Autowired private OrderService orderService;
    @Autowired private StationsService stationsService;

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
    Order addOrder(@RequestBody Order order){
        orderService.saveOrder(order);
        return order;
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
}
