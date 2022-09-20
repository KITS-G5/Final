import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link, NavLink} from 'react-router-dom';
import {Form, InputGroup} from "react-bootstrap";
import {Line} from "react-chartjs-2";
import LineChart from 'react-linechart';

import './styles.css'
import constantUrl from "../../../Components/ConstantUrl";

const HomeAdmin = () => {
    const [data, setData] = useState([]);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [revenue, setRevenue] = useState(0);
    const [net, setNet] = useState(0);
    const [loan, setLoan] = useState(0);
    const [revenueByMonth, setRevenueByMonth] = useState([]);
    console.log(localStorage.getItem("role"))
    useEffect(() => {
        let url = '/orders';
        fetch(constantUrl + url)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                setData(data);
            });


        let url_gross_revenue = '/orders/admin/grossRevenueByDate';
        let url_net_revenue = '/orders/admin/netRevenueByDate';
        let url_loan_revenue = '/orders/admin/notPaidRevenueByDate';
        if (from != null && to != null) {
            url_gross_revenue = url_gross_revenue + '?date1=' + from + '&&date2=' + to;
            url_net_revenue = url_net_revenue + '?date1=' + from + '&&date2=' + to;
            url_loan_revenue = url_loan_revenue + '?date1=' + from + '&&date2=' + to;
        }
        fetch(constantUrl + url_gross_revenue,
            {headers:
                    {"Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")}}
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Revenue =", data);
                setRevenue(data);
                console.log(data);
            })

        fetch(constantUrl + url_net_revenue,
            {headers:
                    {"Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")}}
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Revenue =", data);
                setNet(data);
                console.log(data);
            })
        console.log(localStorage.getItem("token"))
        fetch(constantUrl + url_loan_revenue,
            {headers:
                    {"Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")}}
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Revenue =", data);
                setLoan(data);
                console.log(data);
            })
    }, [from, to]);

    //  useState set month, year to calculate revenue
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    useEffect(() => {
        let url_get_revenue_by_month = "/orders/admin";
        if (month!= null && year != null) {
            url_get_revenue_by_month = url_get_revenue_by_month+ "/findOrdersByMonthAndYear?month=" + month + "&&year=" + year; 
        }
         fetch(constantUrl + url_get_revenue_by_month,
             {headers : {"Content-Type": "application/json","Authorization": "Bearer " + localStorage.getItem("token")}})
            .then((response) => response.json())
            .then((data) => {
                console.log("Revenue by month =", data);
                setRevenueByMonth(data);
                console.log(data);
            })


    }, [month, year]);

    // let revenueTbl = revenueByMonth.map(item => {
    //     return (
    //         <>
    //             <h1>
    //             {item.rentingStartedDate}
    //             </h1>
    //             <h3>
    //                 {item.rentingEndDate}
    //             </h3>
    //             <h3>
    //                 {item.totalFee}
    //             </h3>
    //         </>
    //         )
    // })

    
    let table = revenueByMonth.map((item) => {
        return (
            <h5>{item.totalFee}</h5>
        )
    })

    let dataTable = data.map((item) => {
        return {
            id: item.id,
            customer: item.card.customer.name,
            bike: item.bike.bikeName,
            from: item.rentingStartedDate,
            to: item.rentingEndDate,
            total: 0,
            // <button></button>
        }
    })

// get data table column

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'customer', headerName: 'Customer', width: 200 },
        { field: 'bike', headerName: 'Bike ', width: 150 },
        { field: 'from', headerName: 'From', width: 300},
        { field: 'to', headerName: 'To', width: 300 },
        { field: 'total', headerName: 'Total', width: 300 },
        {
            field: "View",
            renderCell: (cellValues) => {
                return (
                    <NavLink
                        to='#'
                    >
                        View
                    </NavLink>
                );
            }
        },
        {
            field: "Delete",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="outlined"
                        color="error"
                        // onClick={(event) => {
                        //     deleteUser(cellValues.id);
                        //     console.log('delete', cellValues.id);
                        // }}
                    >
                        Delete
                    </Button>
                );
            }
        }];
    let pointsData = [];
    let i=0;
    pointsData = revenueByMonth.map((item) => {
        return {
            x: i++,
            y: Math.random()
        }
    })

    // let pointsData = [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}]
    console.log(pointsData);
    const dataChart =  [
        {
            color: "steelblue",
            points: pointsData
        }
    ];

    return (
        <>
            <div style={{height: '80vh'}} className={'mx-auto dashboard-container'}>
                <h1 style={{marginTop: '80px'}}>DASHBOARD</h1>
                {/*insert chart*/}
                {/*add filter to filter orders by date, by station*/}
                {/*<div className="d-flex justify-content-between cards">*/}
                {/*    <div className="card-div text-center">*/}
                {/*        <h2 className={'mt-3'}>1500*/}
                {/*        </h2>*/}
                {/*        <h3>BIKES</h3>*/}
                {/*    </div>*/}
                {/*    <div className="card-div text-center">*/}
                {/*        <h2 className={'mt-3'}>500*/}
                {/*        </h2>*/}
                {/*        <h2>STATIONS</h2>*/}
                {/*    </div>*/}
                {/*    <div className="card-div text-center">*/}
                {/*        <h2 className={'mt-3'}>120.000*/}
                {/*        </h2>*/}
                {/*        <h3>USERS</h3>*/}
                {/*    </div>*/}
                {/*    <div className="card-div text-center">*/}
                {/*        <h2 className={'mt-3'}>$1.000.000*/}
                {/*        </h2>*/}
                {/*        <h3>REVENUE</h3>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*charts*/}
                {/* get revenue for chart data */}

                <div className="chart-container d-flex justify-content-between mt-5">
                    <div className="row collection justify-content-between">
                        <div className="">
                            <h5 className={'mt-5'}>Chooe period to list orders</h5>
                            <br/>
                            <div className="input-group ">
                                {/* <input onChange={(e) => setMonth(e.target.value)} className={'form-control'} type="text" name="month"/> */}
                                <Form.Group className="mb-3">
                                    <Form.Select name="id" onChange={(e) => setMonth(e.target.value)}>
                                        <option value="">Choose month</option>
                                        <option value="1">Jan</option>
                                        <option value="2">Feb</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </Form.Select>
                                </Form.Group>
                                {/* <input onChange={(e) => setYear(e.target.value)}  className={'form-control mx-5'} type="text" name="year"/> */}
                                <Form.Group className="mb-3 mx-5">
                                    <Form.Select name="id" onChange={(e) => setYear(e.target.value)}>
                                        <option value="">Choose year</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="chart-div">
                        <LineChart
                            width={700}
                            height={500}
                            data={dataChart}
                        />
                    </div>
                </div>
         
                {/*Revenue report*/}

                <div className="row collection justify-content-between">
                    <div className="col-lg-6 col-md-12">
                        <h5 className={'mt-5'}>Choose date to calculate revenue</h5>
                        <br/>
                        <div className="w-50 input-group ">
                            <input onChange={(e) => setFrom(e.target.value)} className={'form-control'} type="date" name="from-date" id="from-date"/>
                            <input onChange={(e) => setTo(e.target.value)}  className={'form-control mx-5'} type="date" name="to-date" id="to-date"/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 mt-5">
                        {/*<h1>Revenue = ${revenue}</h1>*/}

                        <table className="table">
                            <tbody>
                                <tr>
                                    <th scope="row">Gross revenue</th>
                                    <td className={'text-center'}>${revenue}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Net Revenue</th>
                                    <td className={'text-center'}>${net}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Not paid</th>
                                    <td className={'text-center'}>${loan}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*end revenue report*/}
                <h2 className={'mt-5'}>Orders</h2>
                <DataGrid
                    style={{marginTop: '30px'}}
                    rows={dataTable}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    BaseButton
                />
            </div>
        </>
    );
};

export default HomeAdmin;