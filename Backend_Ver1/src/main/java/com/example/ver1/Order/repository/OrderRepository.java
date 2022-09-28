package com.example.ver1.Order.repository;

import com.example.ver1.Card.Model.Card;
import com.example.ver1.Order.Model.Order;
import com.example.ver1.Stations.model.Stations;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @NotNull
    Page<Order> findAll(@NotNull Pageable pageable);

    Optional<Order> findOrderByCardAndPaymentStatus(Card card, boolean paymentStatus);

    Optional<Order> findOrderByCardAndPaymentStatusAndReturnStatus(Card card, boolean paymentStatus,
            boolean returnStatus);

    // this method to return nearest paid order of a card
    @Query(value = "select a.* from tbl_order a where a.card_id = :cardId and a.payment_status = 1 and a.return_status = 1 order by a.id desc limit 1", nativeQuery = true)
    Optional<Order> findLatestPaidOrderOfACard(@Param("cardId") long cardId);

    Page<Order> findOrdersByCard(Card card, Pageable pageable);

    // query list of order by month and year
    @Query(value = "SELECT a.* FROM tbl_order a where :month = (select month(a.rent_start_date) as month) and :year = (select year(a.rent_start_date) as year)", nativeQuery = true)
    List<Order> findOrdersByMonthAndYear(@Param("month") String month, @Param("year") String year);

    // query total revenue all time
    @Query(value = "SELECT sum(a.total_fee) FROM tbl_order a", nativeQuery = true)
    Double totalRevenue();

    // query total revenue by date
    @Query(value = "SELECT sum(a.total_fee) FROM tbl_order a where :date1 <= rent_start_date and :date2 >= rend_end_date", nativeQuery = true)
    Double totalRevenueByDate(@Param("date1") Date date1, @Param("date2") Date date2);

    // net all time
    @Query(value = "SELECT sum(a.total_fee) FROM tbl_order a where a.payment_status = 1", nativeQuery = true)
    Double netRevenue();

    // net revenue by date
    @Query(value = "SELECT sum(a.total_fee) FROM tbl_order a where a.payment_status = 1 and :date1 <= rent_start_date and :date2 >= rend_end_date", nativeQuery = true)
    Double netRevenueByDate(@Param("date1") Date date1, @Param("date2") Date date2);

    // not paid revenue all time
    @Query(value = "SELECT sum(a.total_fee) FROM tbl_order a where a.payment_status = 0", nativeQuery = true)
    Double notPaidRevenue();

    // not paid revenue by date
    @Query(value = "SELECT sum(a.total_fee) FROM tbl_order a where a.payment_status = 0 and :date1 <= rent_start_date and :date2 >= rend_end_date", nativeQuery = true)
    Double notPaidRevenueByDate(@Param("date1") Date date1, @Param("date2") Date date2);

    // selett total free by month and year group by date and date
    @Query(value = "SELECT sum(a.total_fee) as total, date(a.rent_start_date) as date FROM tbl_order a where :month = (select month(a.rent_start_date) as month) and :year = (select year(a.rent_start_date) as year) group by date(a.rent_start_date)", nativeQuery = true)
    List<Object[]> sumTotalByMonthAndYear(@Param("month") String month, @Param("year") String year);

}
