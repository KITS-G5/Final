import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import image from "../../../image/Atm.png";

const EcoCreateMember = () => {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [cardNum, setCardNum] = useState('')
    const [cardPassword, setCardPassword] = useState('')
    const [typeCard, setTypeCard] = useState('')
    const [error, setError] = useState('');

    const navigate = useNavigate();
  /*  useEffect(() => {
        fetch('http://localhost:8080/card-type')
            .then((res) => res.json())
            .then((res) => {
                setTypeCard(res)
                console.log(res)
            })
    },[])
*/
   /* const opt = typeCard.map((item) => {
        return (
            <option value={item.id}>
                {item.cardType}
            </option>
        )
    })*/
    // useEffect(() => {
    //     if(localStorage.getItem('user_info')) {
    //         navigate('/main')
    //     }
    // },[])
    const handleLogin = (e) => {

        e.preventDefault()
        setError('')
       // http://localhost:8080/customer/
        axios.post('http://localhost:8080/api/auth/signup/', {
            name:name,
            address:address,
            phone:phone,
            typeCard:typeCard,
            cardPassword:cardPassword
        })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                setError(err.message)
                alert(err.message)
            })
        // navigate(`sign_account}`)
    }
    const handlePass = (e) => {
        setCardPassword(e.target.value)

    }

    const hanldeSelect = (e) => {
        setTypeCard(e.target.value)
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
                            <select
                                name="cardType"
                                value={typeCard.cardName}
                                onChange={hanldeSelect}
                            >
                                <option value={typeCard.cardName}>abc</option>
                                <option value={typeCard.cardName}>xxx</option>
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