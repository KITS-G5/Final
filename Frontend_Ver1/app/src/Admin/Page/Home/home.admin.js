import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link, NavLink} from 'react-router-dom';
import "./styles.css";

const HomeAdmin = () => {
    const [data, setData] = useState([]);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [revenue, setRevenue] = useState(0);
    const [net, setNet] = useState(0);
    const [loan, setLoan] = useState(0);

    useEffect(() => {
        console.log('user use effect!!');
        let url = 'http://localhost:8080/orders';
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                setData(data);
            });

        let url_gross_revenue = 'http://localhost:3000/orders/admin/grossRevenueByDate';
        let url_net_revenue = 'http://localhost:3000/orders/admin/netRevenueByDate';
        let url_loan_revenue = 'http://localhost:3000/orders/admin/notPaidRevenueByDate';
        if (from != null && to != null) {
            url_gross_revenue = url_gross_revenue + '?date1=' + from + '&&date2=' + to;
            url_net_revenue = url_net_revenue + '?date1=' + from + '&&date2=' + to;
            url_loan_revenue = url_loan_revenue + '?date1=' + from + '&&date2=' + to;
        }
        console.log(url_gross_revenue);
        fetch(url_gross_revenue)
            .then((response) => response.json())
            .then((data) => {
                console.log("Revenue =", data);
                setRevenue(data);
                console.log(data);
            })

        fetch(url_net_revenue)
            .then((response) => response.json())
            .then((data) => {
                console.log("Revenue =", data);
                setNet(data);
                console.log(data);
            })

        fetch(url_loan_revenue)
            .then((response) => response.json())
            .then((data) => {
                console.log("Revenue =", data);
                setLoan(data);
                console.log(data);
            })
    }, [from, to]);
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
    // const deleteOrder = (id) => {
    //     //fetch bike
    //     let url = 'http://localhost:8080/api/v1/bikes/deleteBike/' + id;
    //     fetch(url, {
    //         method: 'DELETE',
    //     }).then(() => {
    //         console.log('delete successful!!');
    //         let result = [...data];
    //         result = result.filter((item) => {
    //             return item.id != id;
    //         });
    //         setData(result);
    //     });
    // };

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


    return (
        <>
            <div style={{height: '80vh'}} className={'mx-auto dashboard-container'}>
                <h1 style={{marginTop: '80px'}}>DASHBOARD</h1>
                {/*insert chart*/}
                {/*add filter to filter orders by date, by station*/}
                <div className="d-flex justify-content-between cards">
                    <div className="card-div">
                        number of bikes
                    </div>
                    <div className="card-div">
                        number of stations
                    </div>
                    <div className="card-div">
                        revenue
                    </div>
                    <div className="card-div">
                        abc
                    </div>
                </div>

                {/*charts*/}

                <div className="chart-container d-flex justify-content-between mt-5">
                    <div className="chart-div">
                        revenue chart
                    </div>
                    <div className="chart-div">
                        user chart
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