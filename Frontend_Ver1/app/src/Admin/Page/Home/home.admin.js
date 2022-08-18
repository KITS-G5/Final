import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link, NavLink} from 'react-router-dom';
import './styles.css'

const HomeAdmin = () => {
    const [data, setData] = useState([]);
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
    }, []);
    let i = 0;
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