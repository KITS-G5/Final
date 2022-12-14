import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListALlBikesBYStation from "./ListAllBikesByStations";
import CardNum from "./CardNum";
import card1 from "../../../BuyCardWeb/img/frontcard.png";
import card2 from "../../../BuyCardWeb/img/backend.png";
import {Button, Modal} from "react-bootstrap";
import constantUrl from "../../../Components/ConstantUrl";

const RentBike = () => {

        let style1 = {
            marginLeft : "10px",
            border : "2x solid green",
            color : "green"
        }
        let style2 = {
            marginLeft : "10px",
            border : "grey",
            color: "grey"
        }


        //selection box for station name
        let [stations, setStations] = useState(null);
        let [selectedStationID, setSelectedStationID] = useState("1");
        let [selectedStation, setSelectedStation] = useState(null);

        console.log("Check selected ", selectedStationID)

/*        if (stations !== null) {
            setSelectedStation(stations.find(x => x.id === selectedStationID))
            console.log(">>>>>>>>>>>>>check selected station ", selectedStation)
        }*/

        useEffect(() => {
            let url = '/api/v1/stations/';
            console.log(url);
            fetch(constantUrl + url)
                .then((response) => response.json())
                .then((data) => {
                    setStations(data);
                    console.log(data)
                });
        }, []);

        const [bikes, setBikes] = useState([]);
        let countBikes = 0;
        if (bikes != null) {
            for (let i = 0; i < bikes.length; i++) {
                if (bikes[i].status) {
                    countBikes = countBikes + 1
                }
            }
            console.log(">>>>>>>>>>check count bikes ", countBikes)
        }

        let totalBikes
        if (countBikes > 1) {
            totalBikes = <><h3>There are total {countBikes} bikes available in the station</h3>
                <h3 className={'mt-3'}>Select your bike: </h3></>
        } else if (countBikes === 1) {
            totalBikes = <><h3>There is {countBikes} bike available in the station</h3>
                <h3 className={'mt-3'}>Select your bike: </h3></>
        } else {
            totalBikes = <h3>There is no bike available in the station</h3>
        }


        useEffect(() => {
            let url = "/api/v1/station/bikes/" + selectedStationID;
            fetch(constantUrl + url)
                .then((response) => response.json())
                .then((data) => {
                    setBikes(data);
                });
        }, [selectedStationID]);


        let bikeList = [];
        console.log(bikes)
        const [chosenBike, setChosenBike] = useState("");

        //anh luyen sua day
        if (bikes != null) {
            bikeList = bikes.map((item, index) => {
                return (
                    <div className="d-inline-flex justify-content-center align-items-center bike-gap mt-3"
                         style={{border: "none", width: "45%"}} key={index}>
                        <input className="form-check-input" type="radio" name="bike" id="bike" disabled={!item.status}
                               value={item.id} onChange={(e) => setChosenBike(e.target.value)}/>
                        <label className="form-check-label" htmlFor="bike" style={item.status ? style1 : style2}>
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
        let statName = "";
        if (stations != null) {
            statName = stations.filter((item)=>item.id == selectedStationID).map((item) => {
                return (
                    <>
                        <h2 className={'text-center mt-5'}>Welcome to station: {item.stationName}</h2>
                        <h5 className={'text-center mt-2'}>Your current location: {item.stationAddress}</h5>
                    </>
                );
            });
        }
        if (stations != null) {
            checkStation = stations.map((item) => {
                    return (
                        <>
                        <option value={item.id} key={item.id}>{item.stationName} {stations.stationAddress}</option>
                        </>
                    )
                }
            );
        }
        const [cardNum, setCardNum] = useState("");
        const [cardCcv, setCardCcv] = useState("");
        const [cardData, setCardData] = useState([]);
        useEffect(() => {
            let url = '/api/v1/cards/user/' + cardNum;
            fetch(constantUrl + url)
                .then(res => res.json())
                .then(data => setCardData(data));
        }, [cardNum]);
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const [rentMessage, setRentMessage] = useState("");
        const handleRent = () => {
            setShow(true);
            let cardChosenId = cardData.id;
            let cardChosenNum = cardData.cardNum;
           // let cardChosenCcv = cardCcv;
            let rentData = {
                "bike":
                    {
                        "id": chosenBike
                    }
                ,
                "card": {
                    "id": cardChosenId,
                    "cardNum": cardChosenNum,
                    "cardCcv": cardCcv
                }
            }
            const requestOption = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(rentData)
            };
            console.log(requestOption)
            fetch(constantUrl + "/orders", requestOption)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    // alert(data.message)
                    setRentMessage(data.message);
                });
            // setTimeout(function(){
            //     window.location.reload();
            // }, 2000);
        };

        return (
            <>
            <div className={"container mb-5"}>
                {/*<h3>Welcome to station name: {selectedStationID}</h3>*/}
                {/*<h3>Welcome to station: {selectedStationID}</h3>*/}
                {statName}
                <select className="form-select"
                        onChange={(e) => setSelectedStationID(e.target.value)}

                >
                    <option defaultValue={1} disabled>Please selection your station</option>
                    {checkStation}
                </select>

                <hr className={'mt-4 mb-3'}/>

                <div className={"d-flex flex-wrap justify-content-evenly align-items-center"}>
                    {/*{stations !== null ? <ListALlBikesBYStation idStation={selectedStationID}/> : ""}*/}
                </div>

                {totalBikes}
                {bikeList}

                <hr className={'mt-4'}/>


                {/*card number section*/}

                <h3>Enter your card information</h3>
                <div className={'d-flex align-items-start justify-content-around cardNum'}>
                    <form className={'cardNum-left'}>
                        <div className="mb-3">
                            <label htmlFor="cardNum" className="form-label">Card number</label>
                            <input type="text" className="form-control"
                                   onChange={(event) => setCardNum(event.target.value)} value={cardNum}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="CVV" className="form-label">CVV</label>
                            <input type="number" className="form-control"
                                   onChange={(event) => setCardCcv(event.target.value)} value={cardCcv}/>
                        </div>
                    </form>
                    <div className={'cardNum-right'}>
                        <img src={card1} alt={'cardIMG'} className={'cardNum-right1'}/>
                        <img src={card2} alt={'cardIMG'} className={'cardNum-right2'}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => handleRent()} disabled={countBikes===0 && true}>Rent this bike</button>
            </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bike rented</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{rentMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                </>
        );
    }
;

export default RentBike;