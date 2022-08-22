import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListALlBikesBYStation from "./ListAllBikesByStations";
import CardNum from "./CardNum";
import card1 from "../../../BuyCardWeb/img/frontcard.png";
import card2 from "../../../BuyCardWeb/img/backend.png";


const RentBike = () => {
    const params = useParams();

    //selection box for station name
    let [stations, setStations] = useState(null);
    let [selectedStationID, setSelectedStationID] = useState("1");
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

    const [bikes, setBikes] = useState([]);
    const [countBikes, setCountBikes] = useState(0);
    useEffect(() => {
            console.log(stations)
            let url = "http://localhost:8080/api/v1/station/bikes/" + selectedStationID;
            console.log('check url', url);
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setBikes(data);
                });
        }, [selectedStationID]);

    let bikeList = [];
    console.log(bikes)
    //anh luyen sua day
    if (bikes != null) {
        bikeList = bikes.map((item) => {
            return (
                <div className="d-inline-flex justify-content-center align-items-center bike-gap"
                     style={{border: "solid", width: "45%"}}>
                    <input className="form-check-input" type="radio" name="bike" id="bike" disabled={!item.status}/>
                    <label className="form-check-label" htmlFor="bike">
                        <div className="card" style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">Bike {item.bikeName}</h5>
                                <p className="card-text">{item.status ? 'Available' : 'Renting'}</p>
                            </div>
                        </div>
                    </label>
                </div>
            )
        });
    }

    var checkStation = [];
    if (stations != null) {
        checkStation = stations.map((item) => {
                return (
                    <option value={item.id} key={item.id}>{item.stationName} {stations.stationAddress}</option>
                )
            }
        )
    }
    

    return (
        <div className={"container"}>
            <h3>Welcome to station name: {selectedStationID}</h3>

            <select className="form-select"
                onChange={(e) => setSelectedStationID(e.target.value)}

            >
                <option defaultValue={1} disabled>Please selection your station</option>
                {checkStation}
            </select>

            <hr/>

            <div className={"d-flex flex-wrap justify-content-evenly align-items-center"}>
                {/*{stations !== null ? <ListALlBikesBYStation idStation={selectedStationID}/> : ""}*/}
            </div>
            <h3>Select your bike: </h3>
            {bikeList}

            <hr/>


{/*
            card number section
*/}
            <h3>Enter your card information</h3>
            <div className={'d-flex align-items-start justify-content-around cardNum'}>
                <form className={'cardNum-left'}>
                    <div className="mb-3">
                        <label htmlFor="cardNum" className="form-label">Card number</label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="CVV" className="form-label">CVV</label>
                        <input type="number" className="form-control" />
                    </div>
                </form>
                <div className={'cardNum-right'}>
                    <img src={card1} alt={'cardIMG'} className={'cardNum-right1'}/>
                    <img src={card2} alt={'cardIMG'} className={'cardNum-right2'}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Rent this bike</button>
        </div>
    );
};
export default RentBike;