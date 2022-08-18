import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import HeaderAdmin from "../Admin/Layout/Header";
import SideBarUser from "./SideBar";
import {DataGrid} from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const AdminUser = () => {
    const params = useParams();
    const [orderData, setOrderData] = useState([]);
    const [cardData, setCardData] = useState([]);
    useEffect(() => {
        let url = 'http://localhost:8080/orders/user/' + params.cardNum;
        fetch(url)
            .then(res => res.json())
            .then(data => setOrderData(data));
    }, []);
    useEffect(() => {
        let url = 'http://localhost:8080/api/v1/cards/' + params.cardNum;
        fetch(url)
            .then(res => res.json())
            .then(data => setCardData(data));
    },[]);
    let orderList = [];
    let cardNum = "";
    let cardBal = "";
    let dataTable = [];
    if (orderData.content != null) {
        // orderList = orderData.content.map((item) => {
        //     cardNum = item.card.cardNum;
        //     cardBal = item.card.balance;
        //     return (
        //         <>
        //             <tr>
        //                 <td>{item.rentingStartedDate}</td>
        //                 <td>{item.rentingEndDate}</td>
        //                 <td>{item.totalFee.toLocaleString()} VND</td>
        //                 <td>{item.paymentStatus.toString()}</td>
        //             </tr>
        //         </>
        //     )
        // });
        dataTable = orderData.content.map((item) => {
            return {
                id: item.id,
                rentstart: item.rentingStartedDate,
                rentend: item.rentingEndDate,
                fee: item.totalFee.toLocaleString() + " VND",
                paystatus: item.paymentStatus.toString()
                // <button></button>
            }
        })
    }
    if (cardData != null) {
        cardNum = cardData.cardNum;
        // cardBal = cardData.balance;
        // if (cardBal == null) {
        //     if (cardData.cardType.id == 2) {
        //         return (
        //             <h3>This card is postpaid</h3>
        //         );
        //     } else {
        //         return 0;
        //     }
        // }
        if (cardData.balance == 0) {
            if (cardData.cardType.id == 2) {
                cardBal = "This card is postpaid";
            } else {
                cardBal = 0;
            }
        } else {
            cardBal = cardData.balance.toLocaleString() + " VND"
        }
        // console.log(cardData.cardType.id);
    }

    const columns = [
        {field: "id", headerName: "ID", width: 100},
        {field: 'rentstart', headerName: 'Rent Start', width: 300},
        {field: 'rentend', headerName: 'Rent End', width: 300},
        {field: 'fee', headerName: 'Fee', width: 200},
        {field: 'paystatus', headerName: 'Payment Status', width: 200},
        {
            field: "Pay",
            renderCell: (cellValues) => {
                if (cellValues.row.paystatus == "false") {
                    return (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={(event) => {
                                alert('abc');
                            }}
                        >
                            Pay
                        </Button>
                    );
                }
                else return (
                    <Button
                        variant="outlined"
                        color="success"
                        disabled
                    style={{color: "green", borderColor: "green"}}>
                        Done
                    </Button>
                )
            }
        }];
    return (
        <>
            <HeaderAdmin/>
            {/*<Container fluid className={'p-0 col-md-10 float-end'} style={{marginTop: "5rem", marginRight: "5rem"}}>*/}
            {/*    /!*<div style={{border: "red 1px solid", height: "100px"}}>*!/*/}
            {/*    /!*    HEADER HERE*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    <Row>*/}
            {/*        <Col md={12}>*/}
            {/*            <h1>User management</h1>*/}
            {/*            <h6>Your card number: {cardNum}</h6>*/}
            {/*            <h6>Remaining balance: {cardBal.toLocaleString()} VND</h6>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row>*/}
            {/*        <Col md={12}>*/}
            {/*            <Table>*/}
            {/*                <thead>*/}
            {/*                <tr>*/}
            {/*                    <th>Rent start</th>*/}
            {/*                    <th>Rent end</th>*/}
            {/*                    <th>Fee</th>*/}
            {/*                    <th>Payment status</th>*/}
            {/*                </tr>*/}
            {/*                </thead>*/}
            {/*                <tbody>*/}
            {/*                {orderList}*/}
            {/*                </tbody>*/}
            {/*            </Table>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Container>*/}
            <div style={{height: '80vh'}} className={'container mt-5'}>
                <h1 className={'text-center'} style={{marginTop: '60px'}}>USER DATA</h1>
                <h6>Your card number: {cardNum}</h6>
                <h6>Remaining balance: {cardBal}</h6>
                <DataGrid
                    style={{marginTop: '30px'}}
                    rows={dataTable}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    BaseButton
                />
            </div>
            <Container fluid className={'col-md-2 float-start p-0'}>
                {/*<Col style={{height: "100vh", border: "1px red solid"}}>*/}
                {/*    SIDEBAR HERE*/}
                {/*</Col>*/}
                <SideBarUser/>
            </Container>
        </>
    );
};

export default AdminUser;