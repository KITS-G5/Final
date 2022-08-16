package com.example.ver1.Order.Controller;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Order.service.OrderService;
import com.example.ver1.Stations.model.Stations;
import com.example.ver1.Stations.service.StationsService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(path = "{id}")
    Order getOrderById(@PathVariable long id){
        return orderService.getOrderById(id);
    }

    @PostMapping(path = "")
    Order addOrder(Order order){
        orderService.saveOrder(order);
        return order;
    }

    @PutMapping(path = "{idOrder}/{idStation}")
    Order updateOrder(@PathVariable long idOrder, @PathVariable long idStation, @RequestBody Order order){
        Stations stations = stationsService.getStationById(idStation);
        Order found = orderService.getOrderById(idOrder);
        if(found != null) {
            orderService.updateOrder(stations, order, idOrder);
        }
        return order;
    }
}
