package com.example.ver1.Order.Controller;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Order.service.OrderService;
import com.example.ver1.Stations.model.Stations;
import com.example.ver1.Stations.service.StationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    Page<Order> getAllOrderListByUserID(@PathVariable String cardNum, @PathVariable Integer pageNo){
        int pageSize = 20;
        if(pageNo != null) {
            return orderService.getAllOrderByCardNumber(cardNum, pageNo, pageSize);
        }
        return orderService.getAllOrderByCardNumber(cardNum, 1, pageSize);
    }

    @GetMapping(path = {"/admin/{id}", "/user/{id}"})
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
}
