import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ListALlBikesBYStation = ({data}) => {

    //selection box for station name

   /* useEffect(() => {
        let url = 'http://localhost:8080/api/v1/stations';
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setStations(data);
                console.log(data)
            });
    }, []);
    console.log("check station list ", stations)

    var check = []
    if(stations != null) {
        check = stations.map((item) => {
                return (
                    <option value={item.id}>{item.stationName} {stations.stationAddress}</option>
                )
            }
        )
    }
*/
    //autoload bikes in the stations when customer choose the station
    const [bikes, setBikes] = useState(null);

    useEffect(() => {
        let url = 'http://localhost:8080/api/v1/station/bikes/' + data ;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setBikes(data);
                console.log(data)
            });
    }, []);
    console.log("check bikes list: ", bikes)
    let bikeCheck =[]
    if(bikes != null) {
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
    }


    return (
        <div className={"container"}>
            <h3>Welcome to station name:</h3>
            <h3>Total available bikes in the station</h3>
            <hr/>
            <h3>Select your bike: </h3>
            <div className={"d-flex flex-wrap justify-content-evenly align-items-center"}>
                {bikeCheck}
            </div>
        </div>
    );
};

export default ListALlBikesBYStation;