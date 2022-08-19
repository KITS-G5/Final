import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListALlBikesBYStation from "./ListAllBikesByStations";



const RentBike = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        let url = 'http://localhost:8080/customer/getById/' + params.id;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                console.log(data)
            });
    }, []);



    //selection box for station name

    const [stations, setStations] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);
    console.log("Check selected ", selectedStation)

    useEffect(() => {
        let url = 'http://localhost:8080/api/v1/stations/';
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setStations(data);
                console.log(data)
            });
    }, []);
    console.log("check station list ", stations)

    var checkStation = []
    if(stations != null) {
        checkStation = stations.map((item) => {
                return (
                    <option value={item.id}>{item.stationName} {stations.stationAddress}</option>
                )
            }
        )
    }

    return (
        <div className={"container"}>
            {product !== null ? <h1>{product.id}</h1> : 'loading'}
            <h3>Welcome to station name:</h3>
            <select className="form-select" aria-label="Default select example" onChange={(e) => setSelectedStation(e.target.value)}>
                <option selected disabled>Please selection your station</option>
                {checkStation}
            </select>

            <h3>Total available bikes in the station</h3>
            <hr/>
            <h3>Select your bike: </h3>
            <div className={"d-flex flex-wrap justify-content-evenly align-items-center"}>
                {stations !== null ? <ListALlBikesBYStation data={selectedStation} /> : ""}

            </div>
        </div>
    );
};
export default RentBike;