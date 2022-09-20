import React from 'react';
import { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
// param
import { useParams } from 'react-router-dom';
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import constantUrl from "../../../Components/ConstantUrl";

const EditBike = () => {
    const [station, setStaton] = useState([]);
    const [bike, setBike] = useState('');
    const [bikeStation, setBikeStation] = useState('');
    let [status, setStatus] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState('');

    let navigate = useNavigate();
    const params = useParams();
    // alert(params.id);
    // fetch station data

    useEffect(() => {
        let initData = {};
        initData.station = {};
        initData.status = false;
        setBike(initData);
        console.log("data");
        console.log(bike);
        console.log(params.id);
        let url_bike = '/api/v1/bikes/' + params.id;
        fetch(constantUrl + url_bike)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBike(data);
                setSelectedOpt(data.station.id);
                console.log(selectedOpt);
                // alert(data);
            })

        let url = '/api/v1/stations';
        fetch(constantUrl + url)
            .then(res => res.json())
            .then(data => setStaton(data))
    }, [params.id]);

    // handleChange = (e) => {
    // }
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        let data = { ...bike };
        data[name] = value;

        if (name == "status") {
            data[name] = str2bool(value);
            console.log('status');
            console.log(data[name]);
        }

        setBike(data);
        console.log(bike);

      };


      const handleChangeStation = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        let data = { ...bike };
        data.station[name] = value;
        setBike(data);
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

    const handleOnSelected = (e) => {
        setStatus(e.target.value);
        console.log(status);
    }
    const updateData = () => {
        console.log('update data', bike);
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bike),
        };
        fetch(
            constantUrl + '/api/v1/bikes/updateBike/' + bike.id,
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
    const stationOption = station.map(station => {
        return <option key={station.id} value={station.id}>{station.id}</option>
    })

    var str2bool = (value) => {
        if (value && typeof value === 'string') {
            if (value.toLowerCase() === 'true') return true;
            if (value.toLowerCase() === 'false') return false;
        }
        return value;
    };

    return (
      <>
          {bike != null? (
              <div>
          {/* // Add Bike */}
              <h1 className="text-center mt-5">Edit Bike</h1>
              <Form className='container mt-5'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>New bike name</Form.Label>
              <Form.Control type="text" placeholder="Enter bike name" name="bikeName" defaultValue={bike.bikeName} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Select station for new bike</Form.Label>
              <Form.Select name="id" defaultValue="bike.station.id"  onChange={(e) => {
              handleChangeStation(e);
          }}>
          {stationOption}
              </Form.Select>
              </Form.Group>
            <Form.Group >
                <input
                    type="radio"
                    value="false"
                    checked={bike.status == false}
                    name="status"
                    onChange={handleChange}
                />
                Not available
                <input
                    type="radio"
                    value="true"
                    checked={bike.status == true}
                    name="status"
                    onChange={handleChange}
                />
                Available
            </Form.Group>

              <Button variant="primary" type="button" onClick={updateData}>
              Submit
              </Button>
              </Form>
              </div>
              ) : (
                  <div>Not found</div>
          )}
      </>
    )
}


export default EditBike;