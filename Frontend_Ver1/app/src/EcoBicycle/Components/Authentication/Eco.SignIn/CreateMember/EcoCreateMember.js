import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import image from "../../../image/Atm.png";
import constantUrl from "../../../../../Components/ConstantUrl";

const EcoCreateMember = () => {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [cardPassword, setCardPassword] = useState('')
    const [typeCard, setTypeCard] = useState('')
    const [confirm, setConfirm] = useState('');
    const [idTypeCard, setIdTypeCard] = useState(1)


    const navigate = useNavigate();
    // useEffect(() => {
    //     if(phone === '') return
    //     fetch('http://localhost:8080/api/v1/cardByPhoneNumber/' + phone)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setConfirm(res.object.customer.phone)
    //             console.log(res.object.customer.phone)
    //         })
    // },[])
    const handleLogin = () => {
        const requestOption = {
            method: "POST",
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name:name,
                address:address,
                phone:phone,
                cardType: {
                    id : idTypeCard,
                    cardType:typeCard
                },
                cardPassword:cardPassword
            })
        };
        console.log(requestOption)
        console.log(requestOption.body)
        fetch(constantUrl + "/api/auth/signup", requestOption)
            .then(res => res.json())
            .then(data => {
                alert(data.message)
                console.log(data.body.slice(54,64))

            });
        // window.location.reload();
        const timeout = setTimeout(() => {
            navigate('/confirm/' + phone)
        },1000)
        return () => clearTimeout(timeout)
    };
    const handlePass = (e) => {
        setCardPassword(e.target.value)
    }
    const hanldeSelect = (e) => {
        setTypeCard(e.target.value)
        if(setTypeCard(e.target.value) === 'Banking') {
            setIdTypeCard(2)
        }
        console.log(e.target.value)
    }




    return (
        <div className='row' style={{width:'70%', margin:'auto'}}>
            <div className='col-md-6 col-lg-6'>
                <img src={image}
                     alt=""
                     width='100%'
                />
            </div>
            <div className='col-md-6 col-lg-6'>
                <form className="row g-3 needs-validation mt-5" noValidate>
                    <div className="col-md-6">
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
                        <div className="select-container">
                            <select className="form-select" aria-label="Default select example"
                                name="cardType"
                                value={typeCard.cardName}
                                onChange={hanldeSelect}
                            >
                                <option defaultValue={1} value={typeCard.cardName}>Prepaid</option>
                                <option defaultValue={2} value={typeCard.cardName}>Banking</option>
                            </select>
                        </div>


                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationCustom01" className="form-label">Password</label>
                        <input type="password"
                               className="form-control"
                               id="validationCustom01"
                               value={cardPassword}
                               onChange={handlePass}
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
                        <button className="btn btn-primary" type="button" onClick={handleLogin}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default EcoCreateMember;