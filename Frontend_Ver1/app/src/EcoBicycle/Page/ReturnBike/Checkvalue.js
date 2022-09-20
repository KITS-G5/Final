import React from 'react'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import image from "../../Components/image/Atm.png";
import {Button, Modal} from "react-bootstrap";
import constantUrl from "../../../Components/ConstantUrl";

export default function Checkvalue() {
    const params = useParams()
    let navigate = useNavigate();
    const [cardNum, setCardNum] = useState('');
    const [cardCcv, setCardCcv] = useState('');
    const [idcus, setIdCus] = useState("")
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if(cardNum === '') return
        let url = '/api/v1/cards/user/' + cardNum;
        fetch(constantUrl + url)
            .then(res => res.json())
            .then((res) => {
                setIdCus(res.id)
                console.log(res.id)
            });
    }, [cardNum]);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        window.location.reload();
        setStatus(true)
        navigate(-2);
    };
    const [returnMesg, setReturnMesg] = useState("");
    const showData = () => {
        setShow(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: idcus,
                cardNum:cardNum,
                cardCcv: cardCcv
            })
        };
        let url = '/orders/user/' + params.id
        console.log(url)
        fetch(constantUrl  + url, requestOptions)
            .then(response => response.json())
            .then(data =>
                // alert(data.message)
                setReturnMesg(data.message)
            );
        // window.location.reload();
        // setStatus(true)
        // navigate(-1)
    }
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
        <div>
            <div>
                <div className='row mt-5' style={{width:'70%', margin:'auto'}}>
                    <div className='col-md-6 col-lg-6'>
                        <img src={image}
                             alt=""
                             width='100%'
                        />
                    </div>
                    <div className='col-md-6 col-lg-6'>
                        <form className="row g-3 needs-validation mt-5" onSubmit={onSubmit} noValidate>
                            <div className="col-md-6">

                                <label htmlFor="validationCustom03" className="form-label">Card num</label>
                                <input type="phone"
                                       value={cardNum}
                                       onChange={(event) => setCardNum(event.target.value)}
                                       name='cardNum'
                                       className="form-control"
                                       id="validationCustom03"
                                       required />
                                <div className="invalid-feedback">
                                    Please provide a valid address
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationCustom01" className="form-label">Card Ccv</label>
                                <input type="password"
                                       className="form-control"
                                       id="validationCustom01"
                                       name='cardCcv'
                                       value={cardCcv}
                                       onChange={(event) => setCardCcv(event.target.value)}
                                       required />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            {/*<div className="col-12">*/}
                            {/*    <div className="form-check">*/}
                            {/*        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />*/}
                            {/*        <label className="form-check-label" htmlFor="invalidCheck">*/}
                            {/*            Agree to terms and conditions*/}
                            {/*        </label>*/}
                            {/*        <div className="invalid-feedback">*/}
                            {/*            You must agree before submitting.*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="col-12">
                                <button className="btn btn-primary" type="button"  onClick={showData} >
                                    PAY NOW
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bike return</Modal.Title>
                </Modal.Header>
                <Modal.Body>{returnMesg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
</>
    );
}
