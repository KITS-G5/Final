import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListALlBikesBYStation from "./ListAllBikesByStations";
import CardNum from "./CardNum";



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
            });
    }, []);



    //selection box for station name
    let [stations, setStations] = useState(null);
    let [selectedStationID, setSelectedStationID] = useState(null);
    let [selectedStation, setSelectedStation] = useState(null);

    console.log("Check selected ", selectedStationID)


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

    useEffect(() => {
        if(stations != null) {
            setSelectedStation(stations.filter(item => item.id = selectedStationID))
            console.log("check station ", selectedStation)
        }

    }, []);

    var checkStation = []
    if(stations != null) {
        checkStation = stations.map((item) => {
                return (
                    <option value={item.id} key={item.id}>{item.stationName} {stations.stationAddress}</option>
                )
            }
        )
    }

    return (
        <div className={"container"}>
            {product !== null ? <h1>{product.id}</h1> : 'loading'}
            <h3>Welcome to station name: {selectedStationID}</h3>
            <select className="form-select" aria-label="Default select example" onChange={(e) => setSelectedStationID(e.target.value)}>
                <option defaultValue={1} disabled>Please selection your station</option>
                {checkStation}
            </select>

            <hr/>

            <div className={"d-flex flex-wrap justify-content-evenly align-items-center"}>
                {stations !== null ? <ListALlBikesBYStation idStation={selectedStationID}/> : ""}
            </div>
            <hr/>

            <h3>Enter your card information</h3>
            <CardNum />
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    );
};
export default RentBike;