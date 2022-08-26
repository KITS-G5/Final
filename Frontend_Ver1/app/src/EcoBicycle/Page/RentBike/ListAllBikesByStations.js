import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ListALlBikesBYStation = (props) => {
    console.log("check id from bikes", props.idStation )
    let stationID = props.idStation

    //autoload bikes in the stations when customer choose the station
    const [bikes, setBikes] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let url = "http://localhost:8080/api/v1/station/bikes/" + {stationID} ;
        console.log('check url', url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setBikes(data);
                console.log(data)
            });
    }, []);
    if (bikes != null) {
        let countNum = 0;
        if (bikes.status === true) {
            setCount(countNum++);
        }
    }
    console.log(count)
    console.log("check bikes list: ", bikes);
    let bikeCheck =[]
/*    if(bikes != null) {
        bikeCheck = bikes.map((item) => {
            return(
                <div className="form-check d-flex justify-content-around align-items-center"
                     style={{border: "solid", maxWidth: "40%"}}>
                    <input className="form-check-input" type="radio" name="bike" id="bike"/>
                    <label className="form-check-label" htmlFor="bike">
                        <div className="card" style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">{item.bikeName}</h5>
                                <p className="card-text">{item.status.toString()}</p>
                            </div>
                        </div>
                    </label>
                </div>
            )
        })
    }*/


    return (
        <div className={"container"}>
            <h3>Total available bikes in the station: </h3>
            <h3>Select your bike: </h3>
            <div className={"d-flex flex-wrap justify-content-evenly align-items-center"}>
                {bikeCheck}
            </div>
        </div>
    );
};

export default ListALlBikesBYStation;