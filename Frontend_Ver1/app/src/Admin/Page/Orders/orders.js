import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link, NavLink} from 'react-router-dom'
const Orders = () => {
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
        { field: 'customer', headerName: 'Customer name', width: 100 },
        { field: 'bike', headerName: 'Bike name', width: 100 },
        { field: 'from', headerName: 'From', width: 150},
        { field: 'to', headerName: 'To', width: 150 },
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
            <div style={{ height: '80vh'}} className={'container'}>
                <h1 className={'text-center'} style={{ marginTop: '80px'}}>BIKE MANAGEMENT SYSTEM</h1>
                {/*add filter to filter orders by date, by station*/}
                <DataGrid
                    style={{ marginTop: '30px'}}
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

export default Orders;