import React, {useState} from 'react';
import image from '../../image/Atm.png'
import Button from 'react-bootstrap/Button';
import { useNavigate} from 'react-router-dom'
import {useEffect} from "react";
import constantUrl from "../../../../Components/ConstantUrl";

const LoginAccount = () => {
    const [name, setName] = useState('')
    const [cardPassword, setCardPassword] = useState('')
    const [cardNum, setCardNum] = useState('')

    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [typeCard, setTypeCard] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('');


    const handleNum = (e) => {
        setCardPassword(e.target.value)
    }

    useEffect(() => {
        if(localStorage.getItem('user_info')) {
            navigate('/main')
        }
    },[])

    async function login() {
        if(name === '' && cardPassword === '') {
            alert('Please enter enough value ')
        }
        let item = {name,address,phone,typeCard,cardNum, cardPassword}
        console.log(item)
        let result = await fetch(constantUrl + '/api/auth/signin/', {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text/plain",
            },
            body: JSON.stringify(item)
        });
        result = await result.json()
        localStorage.setItem("user_info", JSON.stringify(result))
        // navigate(`/main/${item.name}`)
    }
    /*const handleLogin = (e) => {
        if(cardNum === '' || cardPassword === '') {
            return alert("Please ...")
        }


        axios.post('http://localhost:8080/api/auth/signin/', {
            cardNum:cardNum,
            cardPassword:cardPassword
        })
            .then(result => {
                console.log(result)
                // console.log(result.config.data.slice(12, 21))
                // navigate(`/main/${result}`)
            })
            .catch(err => {
                setError(err.message)
                alert(err.message)
            })

    }*/
    return (
        <div style={{marginTop:100}}>
            <h1>Sign in</h1>
            <div className='row mt-5' style={{width:'80%', margin:'auto'}}>
                <div className='col-md-6 col-lg-6'>
                    <img src={image}
                         alt=""
                         width='100%'
                    />
                </div>
                <div className='col-md-6 col-lg-6 mt-5'>
                    name
                    <input type="text"
                           className="form-control"
                           placeholder='number id'
                           value={name}
                           onChange={(e) => setName(e.target.value)}

                    />
                    address
                    <input type="text"
                           className="form-control"
                           placeholder='number id'
                           value={address}
                           onChange={(e) => setAddress(e.target.value)}

                    />
                    phone
                    <input type="number"
                           className="form-control"
                           placeholder='number id'
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}

                    />
                    typecard
                    <input type="text"
                           className="form-control"
                           placeholder='number id'
                           value={typeCard}
                           onChange={(e) => setTypeCard(e.target.value)}
                    />
                    <input type="password"
                           className="form-control"
                           id="validationCustom02"
                           value={cardNum}
                           onChange={(e) => setCardNum(e.target.value)}
                           required
                    />
                    password
                    <input type="password"
                           className="form-control"
                           id="validationCustom02"
                           value={cardPassword}
                           onChange={handleNum}
                           required
                    />
                    <Button type="button" onClick={login}>Submit form</Button>

                </div>

            </div>
        </div>

    );
};

export default LoginAccount;