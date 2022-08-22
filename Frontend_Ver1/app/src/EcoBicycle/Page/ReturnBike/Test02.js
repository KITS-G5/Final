import React from 'react'
import { useState, useEffect } from 'react';
import { Form, InputGroup } from "react-bootstrap";
import {Link} from 'react-router-dom'
import {NavDropdown, Table} from "react-bootstrap";
export default function ReturnBikeTest() {

    const [data, setData] = useState([]);
    const [station, setStation] = useState([]);
    const [district, setDistrict] = useState([]);
    const [dist, setBike] = useState([]);

    const [card, setCard] = useState(null)
    const [searchKeys, setSearchKeys] = useState('');



    useEffect(() => {
        let url = 'http://localhost:8080/api/v1/stations/'
        fetch(url)
            .then(res => res.json())
            .then(res => setStation(res))
    }, [searchKeys]);




    useEffect(() => {
        let url = 'http://localhost:8080/api/v1/cards/'
        fetch(url)
            .then(res => res.json())
            .then(res => setCard(res))
    }, []);



    const myList = station.map((item, index) => (
        <Link to={`/ecobicycle/return_bike/${item.id}`} >
                {item.stationName}
        </Link>
    ))


    // let opt_district = [];
    // const pickBike = (e) => {
    //     let station_id = e.target.value;
    //     opt_district = data.filter(databike => {
    //         return databike.station.id === station_id
    //     })
    //     setBike(opt_district);
    // }
    //
    // const getSearchTerm = (e) => {
    //     pickBike(e);
    //     setSearchKeys(e.target.value);
    //     console.log("search key =", searchKeys);
    // }

    return (
        <div className="container-fluid mt-5">

            <div className={"container"}>
                <h3>Welcome to station name:</h3>
                <h3>Total available bikes in the station</h3>
                <div className=' col-sm-6 ' style={{display:'flex', gap:20}}>
                    {myList}
                </div>



            </div>
        </div>
    )
}
