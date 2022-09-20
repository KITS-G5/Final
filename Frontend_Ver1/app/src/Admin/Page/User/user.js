import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Link, NavLink} from 'react-router-dom'
import constantUrl from "../../../Components/ConstantUrl";
const User = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        let url = '/customer/customers';
        fetch(constantUrl + url)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                setData(data);
            });
    }, []);
    let dataTable = data.map((item) => {
        return {
            id: item.id,
            name: item.name,
            phone: item.phone,
            address: item.address,
            // <button></button>
        }
    })

    const deleteUser = (id) => {
        //fetch bike
        let url = '/customer/' + id;
        fetch(constantUrl + url, {
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'name', headerName: 'Customer name', width: 300 },
        { field: 'phone', headerName: 'Phone', width: 200 },
        { field: 'address', headerName: 'Address', width: 400},
        {
            field: "View",
            renderCell: (cellValues) => {
                return (
                    <NavLink
                        to={'/edit/' +  cellValues.id}
                    >
                        Edit
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
                        onClick={(event) => {
                            deleteUser(cellValues.id);
                            console.log('delete', cellValues.id);
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
        <h1 className={'text-center'} style={{ marginTop: '80px'}}>USER MANAGEMENT SYSTEM</h1>
        <Link to="/addbike" class={'btn btn-danger'}>
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

export default User;