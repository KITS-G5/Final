import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import Button from "@mui/material/Button";

const AddBike = () => {
    const [data, setData] = useState([]);
    const [bike, setBike] = useState(null);
    useEffect(() => {
        console.log('user use effect!!');
        let url = 'http://localhost:8080/api/v1/bikes';
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                setData(data);
            });
    }, []);
    //render list station
    let dataList = '';
    dataList = data.map((item) => {
        return (
            <option value={item.station.id}>{item.station.stationName}</option>
        )
    })
    // save new bike
    // let initData = {};
    // setBike(initData);
    //
    const handleChange = (event) => {
        console.log(event);
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = {...bike};
        data[name] = value;
        console.log(data);
        setBike(data);
    };
    // const handleChangeStation = (event) => {
    //     console.log(event);
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     let data = {...bike};
    //     data.station[name]= value;
    //     console.log(data);
    //     setBike(data);
    // };
    //



    const saveBike = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/v1/bikes', {
            method: 'POST',
            body: JSON.stringify(bike),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if(response.status === 201) {
                alert("New website saved successfully");
                window.location.href = '/';
            }
        });
    }
    return (
        <div className={'container'}>
            <Form onSubmit={saveBike}>
                <Form.Group className="mb-3" controlId="bikeName">
                    <Form.Label>Bike name</Form.Label>
                    <Form.Control  onChange={(e) => handleChange(e)} name={'bikeName'} type="text" placeholder="Enter bike name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="station">
                    <Form.Label>Select station</Form.Label>
                    <Form.Select  onChange={(e) => handleChange(e)} name="station.id" aria-label="Default select example">
                        <option value={''}>Choose station here</option>
                        {dataList}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="station">
                    <Form.Label>Select station</Form.Label>
                    <Form.Select  onChange={(e) => handleChange(e)} name="status" aria-label="Default select example">
                        <option value={'true'}>True</option>
                        <option value={'false'}>False</option>

                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddBike;