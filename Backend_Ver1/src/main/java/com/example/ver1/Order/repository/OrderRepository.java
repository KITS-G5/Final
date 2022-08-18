package com.example.ver1.Order.repository;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Order.Model.Order;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @NotNull Page<Order> findAll(@NotNull Pageable pageable);
    Page<Order> findOrdersByCard(Card card,Pageable pageable);
}
