import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function EcoCreateMember() {
    const [validated, setValidated] = useState(false);
    /*const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()*/
    // useEffect(() => {
    //     if(localStorage.getItem('user_info')) {
    //         navigate('/main')
    //     }
    // },[])
    /*async function signup() {
        let item = {name, address, phone}
        console.warn(item)
        let result = await fetch('https://62b297ff20cad3685c902f74.mockapi.io/product/', {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        })
        result = await result.json()
        localStorage.setItem("user_info",JSON.stringify(result))
        navigate('/sign_account')
    }*/
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div>
            <div style={{width:'40%',margin:'auto', height:'100vh',}}>
                <Form style={{marginTop:150,padding:50, boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px'}} noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label
                            >Name</Form.Label>
                            <Form.Control
                                // onChange={(e) => setName(e.target.value)}
                                required
                                type="text"
                                placeholder="name"
                                // value={name}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                // onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                placeholder="City"
                                required
                                // value={address}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="number"
                                          placeholder="phone number"
                                          required
                                          // onChange={(e) =>setPhone( e.target.value)}
                                          // value={phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>

                    <Button type="submit">
                        Submit form
                    </Button>

                </Form>
            </div>
        </div>


    );
}

export default EcoCreateMember