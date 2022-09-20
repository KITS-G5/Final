import {useContext, useState} from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {LoggerContext} from "../../../Context/GlobalContext";
import {Link} from 'react-router-dom'
import image from "../../../EcoBicycle/Components/image/Atm.png";
import constantUrl from "../../ConstantUrl";


const SigninHome = () => {
    const{setCardLogin, setLogger} = useContext(LoggerContext)
    const [cardNum, setCardNum] = useState('')
    const [cardPassword, setCardPassword] = useState('')
    const [error, setError] = useState('');
    const [isLogger, setIsLogger] = useState('')
    const [admin, setAdmin] = useState('')
    const [status, setStatus] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('user_info')) {
            navigate('/')
        }
    },[])

    const handleLogin = (e) => {
        if(cardNum === '' || cardPassword === '') {
            return alert("Please ...")
        }
        e.preventDefault()
        setError('')
        axios.post(constantUrl + '/api/auth/signin/', {
            cardNum:cardNum,
            cardPassword:cardPassword
        })
        .then(response => {
            const token = response.data.access_tocken;
            const role = response.data.role;
            const id_customer = response.data.id_customer;
            localStorage.setItem("token", token);
            localStorage.setItem("login", true);
            localStorage.setItem("role", role);
            localStorage.setItem("cardNum", cardNum);
            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } else {
                delete axios.defaults.headers.common["Authorization"];
            }
            if (role.includes("admin")) {
                // window.location.href = "/admin/home";
                navigate("/admin/home");
            } else {
                // window.location.href = "/admin/user/" + cardNum;
                // navigate("/admin/user/" + cardNum);
                window.location.href = "/";
            }
        })
            // .then(result => {
            //     console.log("44444")
            //     console.log(result)
            //     let idNum = result.config.data.slice(12,31)
            //     console.log(result.config.data.slice(12,31))
            //     setIsLogger(result.config.data.slice(12,31))
            //     setCardLogin((item) => [...item, idNum])
            //     setLogger(true)
            //     // navigate('/')
            //     /*const timeout = setTimeout(() => {
            //         navigate('/')
            //     },1000)
            //     return () => clearTimeout(timeout)*/
            // })
            .catch(err => {
                setError(err.message)
                alert(err.message)
            })

    }
    const [role, setRole] = useState("");
    useEffect(() => {
        if(isLogger === '') return
        let url = '/api/v1/cards/user/' + isLogger;
        fetch(constantUrl + url)
            .then(res => res.json())
            .then(data=>{
                setAdmin(data.roleSet[0].id)
            })
        handleLoginNav(admin)
    })
    const handleLoginNav = (e) => {

        if (e === 1) {
            navigate("/admin/user/" + isLogger)
        } else if (e === 2 || e === 3) {
            navigate("/admin/home")
        }
    };
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
                    <p className='text-center'>
                        Don't have an account yet?{' '}
                        <Link to='/buycard' >
                            Buy Card
                        </Link>
                    </p>
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