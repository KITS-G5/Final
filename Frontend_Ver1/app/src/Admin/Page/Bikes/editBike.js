import React from 'react';
import { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
// param
import { useParams } from 'react-router-dom';

const EditBike = () => {
    const [station, setStaton] = useState([]);
    const [bike, setBike] = useState('');
    let navigate = useNavigate();
    const params = useParams();
    // fetch station data
    useEffect(() => {
        let url_bike = 'http://localhost:8080/api/v1/bikes/' + params;
        fetch(url_bike)
            .then(res => res.json())
            .then(data => setBike(data))
    
        let url = 'http://localhost:8080/api/v1/stations';
        fetch(url)
            .then(res => res.json())
            .then(data => setStaton(data))
    }, []);

    // handleChange = (e) => {
    // }
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        let data = { ...bike };
        data[name] = value;
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
        console.log(bike);
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


    const updateData = () => {
        console.log('update data', bike);
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bike),
        };
        // fetch(
        //   'http://localhost:8080/api/v1/bikes/updateBike/' + id,
        //   requestOptions
        // )
        //   .then((response) => response.json())
        //     .then((data) => {
        //         console.log('Success:', data);
        //         }
        //     )
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     }
        //
        // );
        navigate(-1);

    }

    // station to option
    const stationOption = station.map(station => {
        return <option key={station.id} value={station.id}>{station.stationName}</option>
    })

    return (
        <div>
            {/* // Add Bike */}
            <h1 className="text-center mt-5">Edit Bike</h1>
            <Form className='container mt-5'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>New bike name</Form.Label>
                    <Form.Control type="text" placeholder="Enter bike name" name="bikeName" value={bike.bikeName} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select station for new bike</Form.Label>
                    <Form.Select name="id" value={bike.station.id}  onChange={(e) => {
                                  handleChangeStation(e);
                                }}>
                        {stationOption}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="button" onClick={updateData}> 
                    Submit
                </Button>
            </Form>
        </div>
    )
}


export default EditBike;