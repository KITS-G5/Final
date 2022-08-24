import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import cardimae from '../../../BuyCardWeb/img/frontcard.png'
import cardimage from '../../../BuyCardWeb/img/confirmcard.png'

const Confirm = () => {
    const Navigate = useNavigate()
    const params = useParams()
    const [cardInfo, setCardInfo] = useState(null)
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/cardByPhoneNumber/' + params.phone)
            .then((res) => res.json())
            .then((res) => {
                setCardInfo(res.object)
                console.log(res.object)
            })
    },[])

    const home = () => {
        Navigate('/')
    }
    return (
        <div>
            {cardInfo !== null ? (
                    <div>
                        <div style={{margin:"auto", display:"flex",justifyContent:'center'}}>
                            <img src={'https://instafamous.pro/images/success-tick-noloop.gif'} alt="" style={{width:234}}/>

                        </div>
                        <h3 className='text-center mb-5'>Thank You For Your Order!</h3>
                        <div className='row container' style={{margin:"auto"}}>
                            <div className='col-md-5 col-lg-5'>
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src={cardimage} alt="avatar" style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',position:"relative"}}/>
                                        <h3 className="my-3 position-absolute  "
                                            style={{
                                                top:164,
                                                left:84,
                                                color:'#e0e0e0',
                                                fontSize:'28px',
                                                textShadow:'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                                        }}>
                                            {cardInfo.cardNum}
                                        </h3>
                                        <h3 className=" mt-4">Card Ccv:  {cardInfo.cardCcv}</h3>


                                    </div>
                                </div>
                            </div>
                            <div className='col-md-5 col-lg-7'>
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{cardInfo.customer.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{cardInfo.customer.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{cardInfo.customer.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Balance</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{cardInfo.balance}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{margin:"auto", display:'flex', justifyContent:'flex-end'}}>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    style={{width:'30%'}}
                                    onClick={home}
                                >
                                    Back to home
                                </button>
                            </div>

                        </div>
                    </div>
                )
                : (
                    <div style={{margin:"auto", padding:100, display:"flex",justifyContent:'center'}}>
                        <img src={'https://i.gifer.com/8tVa.gif'} alt=""/>
                    </div>
                )}
        </div>



    );
};

export default Confirm;