import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link} from "@mui/material";
const Bike = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log('user use effect!!');
        let url = 'http://localhost:8080/api/v1/bikes';
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                setData(data);
            });
    }, []);
    let dataTable = data.map((item) => {
        return {
            id: item.id,
            bikeName: item.bikeName,
            station: item.station.stationName,
            address: item.station.city.cityName + ', ' + item.station.district.districtName,
            status: item.status,
            // <button></button>
        }
    })
    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'bikeName', headerName: 'Bike name', width: 150 },
        { field: 'station', headerName: 'Station name', width: 200 },
        { field: 'address', headerName: 'Address', width: 400},
        { field: 'status', headerName: 'Status', width: 130 },
        {
            field: "View",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(event) => {
                            alert('abc');
                        }}
                    >
                        View
                    </Button>
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
                        onClick={(event) => {
                            alert('abc');
                        }}
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
        <Link to="add-bike" class={'btn btn-danger'}>
            <AddIcon sx={{fontSize: '2.5rem', color: '#ffffff'}}/>
        </Link>
        <Link to="#" class={'btn btn-primary mx-5'}>
            <DeleteOutlineIcon sx={{fontSize: '2.5rem', color: '#ffffff'}}/>
        </Link>
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

export default Bike;