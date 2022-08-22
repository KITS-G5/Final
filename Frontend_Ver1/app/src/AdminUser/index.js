import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
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
        let url = 'http://localhost:8080/api/v1/cards/user/' + params.cardNum;
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
                fee: item.totalFee,
                paystatus: item.paymentStatus.toString()
                // <button></button>
            }
        })
    }
    if (cardData != null) {
        cardNum = cardData.cardNum;
        // if (cardData.balance == 0) {
        //     if (cardData.cardType.id == 2) {
        //         cardBal = "This card is postpaid";
        //     } else {
        //         cardBal = 0;
        //     }
        // }
        if (cardData.balance != undefined) {
            if (cardData.cardType.id == 2) {
                cardBal = "This card is postpaid";
            } else {
                cardBal = cardData.balance.toString() + " VND"
            }
        }
        // console.log(cardData.cardType.id);
    }
    const nav = useNavigate();
    const payMethod = (e) => {
        let fee = parseFloat(e);
        if (cardData != null && orderData.content != null) {
            if (cardData.cardType.id == 1) {
                const requestOpt = {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: cardData.id,
                        balance: cardData.balance - fee
                    })
                };
                fetch('http://localhost:8080/api/v1/cards/' + cardData.id, requestOpt)
                    // .then(res => res.json())
                    .then(data => setCardData(data.id));

                const requestOpt2 = {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: orderData.content.id,
                        totalFee: 0,
                        paymentStatus: true
                    })
                };
                fetch('http://localhost:8080/orders/user/', requestOpt2)
                    .then(res => res.json())
                    .then(data => setOrderData(data.id));
                window.location.reload();
            }
        } else {
            nav('/pay/' + cardData.cardNum + "/" + fee);
        }
    };
    const columns = [
        // {field: "id", headerName: "ID", width: 100},
        {field: 'rentstart', headerName: 'Rent Start', width: 350},
        {field: 'rentend', headerName: 'Rent End', width: 350},
        {field: 'fee', headerName: 'Fee (VND)', width: 200},
        {field: 'paystatus', headerName: 'Payment Status', width: 200},
        {
            field: "Pay",
            renderCell: (cellValues) => {
                if (cellValues.row.paystatus == "false") {
                    return (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={(event) => payMethod(cellValues.row.fee)}
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
                <SideBarUser/>
            </Container>
        </>
    );
};

export default AdminUser;