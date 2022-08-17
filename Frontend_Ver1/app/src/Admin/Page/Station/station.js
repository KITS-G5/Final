import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const Station = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log('user use effect!!');
        let url = 'http://localhost:8080/api/v1/stations';
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
            station: item.stationName,
            city: item.city.cityName,
            district: item.district.districtName
            // <button></button>
        }
    })
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'station', headerName: 'Station name', width: 300 },
        { field: 'district', headerName: 'District', width: 300},
        { field: 'city', headerName: 'City', width: 200},
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
                            deleteStation(cellValues.id);
                            console.log('delete', cellValues.id);
                        }}
                    >
                        Delete
                    </Button>
                );
            }
        }];

    const deleteStation = (id) => {
        //fetch station
        let url = 'http://localhost:8080/api/v1/stations/deleteStation/' + id;
        fetch(url, {
            method: 'DELETE',
        }).then(() => {
            console.log('delete successful!!');
            let result = [...data];
            result = result.filter((item) => {
                return item.id != id;
            });
            setData(result);
        });
    };

    // {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    // ]

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 70 },
    //     { field: 'firstName', headerName: 'First name', width: 130 },
    //     { field: 'lastName', headerName: 'Last name', width: 130 },
    //     {
    //         field: 'age',
    //         headerName: 'Age',
    //         type: 'number',
    //         width: 90,
    //     },
    //     {
    //         field: 'fullName',
    //         headerName: 'Full name',
    //         description: 'This column has a value getter and is not sortable.',
    //         sortable: false,
    //         width: 160,
    //         valueGetter: (params) =>
    //             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //     },
    // ];



    return (
        <div style={{ height: '80vh'}} className={'container mt-5'}>
            <h1 className={'text-center'} style={{ marginTop: '60px'}}>STATION MANAGEMENT SYSTEM</h1>
            <Link to="#" class={'btn btn-danger'}>
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
    );
};

export default Station;