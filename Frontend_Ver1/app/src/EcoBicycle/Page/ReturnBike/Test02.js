import React from 'react'
import {useState, useEffect} from 'react';
import {Form, InputGroup} from "react-bootstrap";
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
        // let url = '/api/v1/stations/'
        let url = "https://projectfinaltest-env.eba-vh2mysap.ap-northeast-1.elasticbeanstalk.com/api/v1/stations/"
        fetch(url)
            .then(res => res.json())
            .then(res => setStation(res))
    }, [searchKeys]);
    useEffect(() => {
        let url = '/api/v1/cards/'
        fetch(url)
            .then(res => res.json())
            .then(res => setCard(res))
    }, []);


    const myList = station.map((item, index) => (
        <div style={{display:'flex'}} >
            <Link
                to={`/ecobicycle/return_bike/${item.id}`}
                style={{textDecoration:'none', color:'#222', padding:60,margin:10, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", fontWeight:600}}
            >
                {item.stationName}
            </Link>
        </div>
    ))

    return (
        <div className="container-fluid mt-5">

            <div className={"container-fulid"}>
                <div>
                    <h3 className='text-center'>Welcome to EcoBicycle</h3>
                    <h3  className='text-center'>Please select the address to return the bike</h3>
                </div>

                <div style={{
                    display:"flex",
                    width:'80%',
                    flexDirection:'row',
                    flexWrap:'wrap',
                    justifyContent:'center',
                    alignItems:'stretch',
                    alignContent:'center',
                    margin:"auto"
                }}>
                    {myList}
                </div>

            </div>
        </div>
    )
}
