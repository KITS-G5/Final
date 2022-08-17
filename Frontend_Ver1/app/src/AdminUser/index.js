import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";

const AdminUser = () => {
    const params = useParams();
    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
        let url = 'http://localhost:8080/orders/user/' + params.cardNum;
        fetch(url)
            .then(res => res.json())
            .then(data => setOrderData(data));
    }, []);
    let orderList = [];
    let cardNum = "";
    let cardBal = "";
    if (orderData.content != null) {
        orderList = orderData.content.map((item) => {
            cardNum = item.card.cardNum;
            cardBal = item.card.balance;
            return (
                <>
                    <tr>
                        <td>{item.rentingStartedDate}</td>
                        <td>{item.rentingEndDate}</td>
                        <td>{item.totalFee.toLocaleString()} VND</td>
                        <td>{item.paymentStatus.toString()}</td>
                    </tr>
                </>
            )
        });
    }
    console.log(cardNum)
    return (
        <>
            <Container fluid className={'p-0 col-md-10 float-end'}>
                <div style={{border: "red 1px solid", height: "100px"}}>
                    HEADER HERE
                </div>
                <Row>
                    <Col md={12}>
                        <h1>User management</h1>
                        <h6>Your card number: {cardNum}</h6>
                        <h6>Remaining balance: {cardBal.toLocaleString()} VND</h6>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Rent start</th>
                                <th>Rent end</th>
                                <th>Fee</th>
                                <th>Payment status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderList}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={'col-md-2 float-start p-0'}>
                <Col style={{height: "100vh", border: "1px red solid"}}>
                    SIDEBAR HERE
                </Col>
            </Container>
        </>
    );
};

export default AdminUser;