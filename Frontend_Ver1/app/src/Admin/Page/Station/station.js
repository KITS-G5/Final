import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {Form, InputGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
const Station = () => {
    const [data, setData] = useState([]);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [dist, setDist] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [searchKeys, setSearchKeys] = useState('');

    useEffect(() => {
        console.log('user use effect!!');
        let url1 = '/api/v1/stations/';
        if (searchKeys != '' || searchCity != '') {
            url1 = '/api/v1/stations' + '/search?q=' + searchKeys + "&&c=" + searchCity;
        }
        console.log(url1);
        fetch(url1, {headers : {"Content-Type": "application/json","Authorization": "Bearer " + localStorage.getItem("token")}})
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                setData(data);
            });

        let url_district = '/api/v1/districts/';
        fetch(url_district,{headers : {"Content-Type": "application/json","Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => res.json())
            .then(data => setDistrict(data))

        let url = '/api/v1/cities';
        fetch(url, {headers : {"Content-Type": "application/json","Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => res.json())
            .then(data => setCity(data))
    }, [searchKeys, searchCity]);

    let dataTable = data.map((item) => {
            return {
                id: item.id,
                station: item.stationName,
                city: item.district.city.cityName,
                district: item.district.districtName
                // <button></button>
            }
        })


    // if (searchCity != '') {
    //     let dataTable = data.filter(data => {
    //             return data.district.city.id == searchCity
    //         }
    //     ).map(item => {
    //         return {
    //             id: item.id,
    //             station: item.stationName,
    //             city: item.district.city.cityName,
    //             district: item.district.districtName
    //             // <button></button>
    //         }
    //     })
    // }
    //
    // if (searchKeys != null) {
    //     let dataTable2 = data.filter(data => {
    //         return data.district.id == searchKeys
    //     }).map(item => {
    //         return {
    //             id: item.id,
    //             station: item.stationName,
    //             city: item.district.city.cityName,
    //             district: item.district.districtName
    //             // <button></button>
    //         }
    //     })
    // }
    const [ids, setIds] = useState([]);
    let rowsId = [];
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'station', headerName: 'Station name', width: 300 },
        { field: 'district', headerName: 'District', width: 300},
        { field: 'city', headerName: 'City', width: 200},
        {
            field: "View",
            renderCell: (cellValues) => {
                return (
                    <NavLink
                        to={'/editStation/' +  cellValues.id}
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
                            deleteStation(cellValues.id);
                            console.log('delete', cellValues.id);
                        }}
                    >
                        Delete
                    </Button>
                );
            }
        },
        {
            field: "Check",
            renderCell: (cellValues) => {
                return (
                    <input type="checkbox" name="checkToDel" onChange={(e) => {
                        rowsId.push(cellValues.id);
                    }}/>
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

    const opt = city.map((item) => {
        return (
            <option value={item.id}>
                {item.cityName}
            </option>
        )
    })

    let opt_district = [];

    const pickCity = (e) => {
        let city_id = e.target.value;
        console.log('city_id', city_id);    
        opt_district = district.filter(district => {
            return district.city.id == city_id
        })
        setDist(opt_district);
        console.log(e.target.value);
        let city_name = city.filter(city => {
            return city.id == city_id;
        })
        console.log(city_name[0].cityName);
        setSearchCity(city_name[0].id);
        console.log('searchkey =' , searchCity);
        
    }

    const getSearchTerm = (e) => {
        pickCity(e);
        setSearchCity(e.target.value);
        console.log("search key =", searchCity);
    }

    const deleteMulti = (e) => {
       rowsId.forEach(id => {
           deleteStation(id);
       });
    }


    return (
        <div style={{ height: '80vh'}} className={'container mt-5'}>
            <h1 className={'text-center'} style={{ marginTop: '60px'}}>STATION MANAGEMENT SYSTEM</h1>
           <div className="d-flex justify-content-between">
               <div className="d-lex">
                   <Link to="#" class={'btn btn-danger'}>
                       <AddIcon sx={{fontSize: '2.5rem', color: '#ffffff'}}/>
                   </Link>
                   <Link to="#" class={'btn btn-primary mx-5'}>
                       <Button onClick={deleteMulti}>DELETE</Button>
                   </Link>

               </div>
               <div className="filter d-flex">
                   <Form.Group className="mb-3">
                       <Form.Select name="id" onChange={getSearchTerm}>
                           <option value="">Choose city</option>
                           {opt}
                       </Form.Select>
                   </Form.Group>
                   <Form.Group className="mb-3">
                       <Form.Select name="id" onChange={(e) => setSearchKeys(e.target.value)}>
                           <option value="">Choose district</option>
                           {dist.map((item) => {
                               return(
                                   <option value={item.districtName}>
                                       {item.districtName}
                                   </option>
                               )
                           })}
                       </Form.Select>
                   </Form.Group>
               </div>
               {/*<div className="searchBox w-50 mx-auto">*/}
               {/*    <InputGroup className="mb-3">*/}
               {/*        <Form.Control*/}
               {/*            placeholder="Search..."*/}
               {/*            aria-describedby="basic-addon2"*/}
               {/*        />*/}
               {/*        <Button className={'btn btn-primary'}>*/}
               {/*            Search*/}
               {/*        </Button>*/}
               {/*    </InputGroup>*/}
               {/*</div>*/}

           </div>

            <DataGrid
                style={{ marginTop: '30px'}}
                rows={dataTable}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                BaseButton
            />
        </div>
    );
};

export default Station;