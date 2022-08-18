import React from 'react';
import { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {click} from "@testing-library/user-event/dist/click";

const AddStation = () => {
    const [station, setStation] = useState([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState([]);
    let [districtOpt, setDistrictOpt] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    let navigate = useNavigate();
    // fetch station data
    useEffect(() => {
        let initData = {};
        initData.district = {};
        // initData.city.id = 1;
        initData.city = {};
        setStation(initData);

        // let url = 'http://localhost:8080/api/v1/cities';
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setStation(data))


        let url_district = 'http://localhost:8080/api/v1/districts';
        fetch(url_district)
            .then(res => res.json())
            .then(data => setDistrict(data))
    }, []);

    // handleChange = (e) => {
    // }
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        let data = { ...station };
        data[name] = value;
        setStation(data);
        console.log(station);

      };

      const handleChangeAddress = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        let data = {...station};
        // data.city[name] = value;
        data.district[name] = value;
        setStation(data);
        console.log(station);
        }
    

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch('http://localhost:8080/api/v1/bikes', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(bike)
    //     })
    // }
    let districtOpt2 = '';
    let district_filter = [];
    const [dist, setDist] = useState([]);

        const pickCity = (e) => {
            let city_id = (e.target.value);
            // console.log(selectedCity);
            // districtOpt = district.filter(district => {
            //     return district.city.id == city
            // }).map(district => {
            //     return (
            //         <option value={district.id}>{district.districtName}</option>
            //     )
            // })

                district_filter = district.filter(district => {
                    return district.city.id == city_id;
                });
            setDist(district_filter);
            const target = e.target;
            const value = target.value;
            const name = target.name;

            let data = {...station};
            data.city[name] = value;
            setStation(data);
            console.log(station);

        }

    // const pickCity = (e) => {
    //     setSelectedCity(e.target.value);
    //     console.log(selectedCity);
    //     // districtOpt = district.filter(district => {
    //     //     return district.city.id == city
    //     // }).map(district => {
    //     //     return (
    //     //         <option value={district.id}>{district.districtName}</option>
    //     //     )
    //     // })
    //
    //     district_filter = district.filter(district => {
    //         return district.city.id == selectedCity;
    //         console.log(district.districtName);
    //     });
    //
    //     districtOpt2 = districtOpt.map((item) => {
    //         return (
    //             <option value={item.id}>{item.districtName}</option>
    //         )
    //     })
    // }

    const saveData = () => {
        console.log('save data', station);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(station),
        };
        fetch(
          'http://localhost:8080/api/v1/stations',
          requestOptions
        )
          .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                }
            )
            .catch((error) => {
                console.error('Error:', error);
            }

        );
        navigate(-1);

    }

    // station to option
    
    return (
        <div>

            {/* // Add Bike */}
            <h1 className="text-center mt-5">Add Station</h1>
            <Form className='container mt-5'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter station name</Form.Label>
                    <Form.Control type="text" placeholder="Enter bike name" name="stationName" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select city</Form.Label>
                    <Form.Select name="id" onChange={pickCity}>
                        <option value={1}>Can Tho</option>
                        <option value={2}>Da Nang</option>
                        <option value={3}>Hai Phong</option>
                        <option value={4}>Ha Noi</option>
                        <option value={5}>Ho Chi Minh</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select district</Form.Label>
                    <Form.Select name="id" value="station.district" onChange={handleChangeAddress} >
                        {dist.map((item) => {
                            return(
                                <option value={item.id}>
                                    {item.districtName}
                                </option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter station address</Form.Label>
                    <Form.Control type="text" placeholder="Enter station address" name="stationAddress"
                                  onChange={handleChange}/>
                </Form.Group>
                {/*input search for location*/}
                {/*return marker on map and get longtitude and latitude*/}
                <Button variant="primary" type="button" onClick={saveData}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}


export default AddStation;