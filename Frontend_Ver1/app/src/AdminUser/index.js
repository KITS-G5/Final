import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";

const AdminUser = () => {
    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
        let url = 'localhost:8080/orders';
        fetch(url)
            .then(res => res.json())
            .then(data => setOrderData(data));
    },[]);
    let orderList = [];
    orderList = orderData.map((item) => {
        return (
            <>
                <td>{item.rend_end_date}</td>
                <td>{item.rent_start_date}</td>
                <td>{item.total_fee}</td>
                <td>{item.payment_status}</td>
            </>
        )
    });
    return (
        <>
            <Container fluid className={'p-0 col-md-10 float-end'}>
                <div style={{border: "red 1px solid", height: "100px"}}>
                    HEADER HERE
                </div>
                <Row>
                    <Col md={12}>
                        <h1>User management</h1>
                        <h6>Your name: </h6>
                        <h6>Your card number: </h6>
                        <h6>Remaining balance: </h6>
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
                            <tr>
                                {orderList}
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={'col-md-2 float-start p-0'}>
                <Col style={{height: "100vh", border:"1px red solid"}}>
                    SIDEBAR HERE
                </Col>
            </Container>
        </>
    );
};

export default AdminUser;