import React from 'react'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import image from "../../Components/image/Atm.png";
export default function Checkvalue() {

    const params = useParams()
    let navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [cardCcv, setCardCcv] = useState('');

    const [data, setData] = useState([]);
    // useEffect(() => {
    //
    //     if (searchTerm.length > 0) {
    //         let url = 'http://localhost:8080/orders/user/';
    //         url = url + searchTerm;
    //         fetch(url)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 var date = new Date();
    //                 // data.content.rentingEndDate = date.toISOString().slice(0, 10);
    //                 data.content.rentingEndDate = date.toISOString();
    //                 console.log(date);
    //                 setData(data.content);
    //                 console.log(data.content)
    //             });
    //     }
    //
    // }, [searchTerm]);

    const SaveReturn = () => {

        useEffect(() => {
            if(cardNum === '' && cardCcv === '') {
                return
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardNum: cardNum,
                    cardCcv:cardCcv
                })
            };
            let url = 'http://localhost:8080/orders/user/' + params.id
            console.log(url)
            fetch(url, requestOptions)

                .then(response => response.json())
                .then(data => console.log(data));

        }, []);
    }

    return (
        <div>
            {/*<div className="container">
                <h2>Return Bike</h2>
                <div className="row">
                    <div className='col-md-6 col-lg-6'>
                        <img src={image}
                             alt=""
                             width='100%'
                        />
                    </div>
                    <div className="col-sm-6">
                        <div className="input-group">
                            <label htmlFor="">
                                Card Number
                                <input
                                    placeholder='please choose card number'
                                    type="text"
                                    className="form-control"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                ></input>
                            </label>

                        </div>
                        <div>
                            <div className="col-sm-6 ">
                                {data.map((item) => {
                                    return (
                                        <div key={item.id} className="row">
                                            {item.returnStatus === true ?
                                                <div>
                                                    <div>
                                                        <span>Xin chao: {item.card.customer.name}</span><br />
                                                        <span>Address: {item.card.customer.address}</span><br />
                                                        <span>Phone: {item.card.customer.phone}</span>
                                                    </div>
                                                    <div>
                                                        <span>Card Type: {item.card.cardType.cardType}</span><br />
                                                        <span>Time in: {item.rentingEndDate}</span><br />
                                                        <span>Time out: {item.rentingStartedDate}</span><br />
                                                         <lable>
                                                        <input
                                                            type="datetime-local"
                                                            id="birthday"
                                                            name="rentingEndDate"
                                                            // value={item.rentingEndDate}
                                                            // onChange={(e) => handleChange(e)}
                                                        ></input>
                                                    </lable><br />
                                                         <lable>
                                                Return Bike
                                                <input
                                                    type="radio"
                                                    id="birthday"
                                                    name="returnStatus"
                                                    value="false"
                                                    checked={item.returnStatus == false}
                                                    // onChange={(e) => {
                                                    //     handleChange(e);
                                                    // }}
                                                ></input>
                                            </lable>
                                                        <input type="checkbox" name="returnStatus" value={returnBike} />
                                                        <input type="button" name="submit" value="Update" onClick={handleReturn} />
                                                    </div>
                                                </div> : ''}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}
            <div>
                <div className='row mt-5' style={{width:'70%', margin:'auto'}}>
                    <div className='col-md-6 col-lg-6'>
                        <img src={image}
                             alt=""
                             width='100%'
                        />
                    </div>
                    <div className='col-md-6 col-lg-6'>
                        <form className="row g-3 needs-validation mt-5" noValidate>
                            {/*<div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">Name</label>
                    <input type="text"
                           className="form-control"
                           id="validationCustom01"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom02" className="form-label">Phone</label>
                    <input type="number"
                           className="form-control"
                           id="validationCustom02"
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label">Address</label>
                    <input type="phone"
                           value={address}
                           onChange={(e) => setAddress(e.target.value)}
                           className="form-control"
                           id="validationCustom03"
                           required/>
                    <div className="invalid-feedback">
                        Please provide a valid address
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">Type Card</label>
                    <input type="text"
                           className="form-control"
                           id="validationCustom01"
                           value={typeCard}
                           onChange={(e) => setTypeCard(e.target.value)}
                           required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>*/}
                            <div className="col-md-6">
                                <label htmlFor="validationCustom03" className="form-label">Card num</label>
                                <input type="phone"
                                       value={cardNum}
                                       onChange={(e) => setCardNum(e.target.value)}
                                       className="form-control"
                                       id="validationCustom03"
                                       required/>
                                <div className="invalid-feedback">
                                    Please provide a valid address
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationCustom01" className="form-label">Password</label>
                                <input type="password"
                                       className="form-control"
                                       id="validationCustom01"
                                       value={cardCcv}
                                       onChange={(e)=> setCardCcv(e.target.value)}
                                       required/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                        Agree to terms and conditions
                                    </label>
                                    <div className="invalid-feedback">
                                        You must agree before submitting.
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary" type="button" onClick={SaveReturn} >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
}
