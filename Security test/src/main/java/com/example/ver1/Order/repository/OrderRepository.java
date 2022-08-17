package com.example.ver1.Order.repository;

import com.example.ver1.Order.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query(value = "select * from tbl_order a join card b on a.card_id = b.id where b.card_num = ?", nativeQuery = true)
    public List<Order> getOrderByCardNum(String cardNum);
}
