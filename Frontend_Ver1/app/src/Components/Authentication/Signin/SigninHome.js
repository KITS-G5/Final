import  {useState} from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import image from "../../../EcoBicycle/Components/image/Atm.png";

const SigninHome = () => {

    const [cardNum, setCardNum] = useState('')
    const [cardPassword, setCardPassword] = useState('')
    const [error, setError] = useState('');
    const [isLogger, setIsLogger] = useState('')
    const [admin, setAdmin] = useState('')

    const navigate = useNavigate();


    const handleLogin = (e) => {
        if(cardNum === '' || cardPassword === '') {
            return alert("Please ...")
        }
        e.preventDefault()
        setError('')
        axios.post('http://localhost:8080/api/auth/signin/', {
            cardNum:cardNum,
            cardPassword:cardPassword
        })
            .then(result => {
                console.log(result.config.data.slice(12,31))
                setIsLogger(result.config.data.slice(12,31))

            })
            .catch(err => {
                setError(err.message)
                alert(err.message)
            })

    }

    useEffect(() => {
        if(isLogger === '') return
        fetch('http://localhost:8080/api/v1/cards/user/' + isLogger)
            .then((res) => res.json())
            .then((res) => {
                setAdmin(res.roleSet[0].title)
                console.log(res.roleSet[0].title)
            })
        if(admin === 'admin'){

            navigate('/admin/home')
        }else {
            navigate('/admin/user')
        }

    },[isLogger])



    
    const SubPass = (e) => {
        setCardPassword(e.target.value)
    }
    return (
        <div style={{marginTop:100}}>

            <div className='row mt-5' style={{width:'70%', margin:'auto'}}>
                <div className='col-md-6 col-lg-6'>
                    <img src={image}
                         alt=""
                         width='100%'
                    />
                </div>
                <div className='col-md-6 col-lg-6'>
                    <form className="row g-3 needs-validation mt-5" noValidate>

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
                                   value={cardPassword}
                                   onChange={SubPass}
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
        </div>
    );
};

export default SigninHome;