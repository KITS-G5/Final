import React from 'react';
import './eco.login.scss'
import {Link, Outlet} from 'react-router-dom'
const EcoSignin = () => {
    return (
        <div className='container-fluid ecoLogin' style={{marginTop:50}}>
            <h3 className='text-center text-light mb-5'>Please prepare before registration</h3>
            <hr style={{width:'50%', color:'white', margin:'auto'}}/>
            <div className="row login_card mt-5">
                <div className="item_Group col-sm-4 col-lg-4">
                    <div className='card_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-provisions-icon1.svg'} alt=""/>
                        <p>Phone Number still active</p>
                        <span className='text-center'>
                            You need to receive verification code via SMS (mobile number is member account)
                        </span>
                    </div>
                </div>
                <div className="item_Group col-sm-4 col-lg-4">
                    <div className='card_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-provisions-icon2.svg'} alt=""/>
                        <p>ID number or residence permit</p>
                        <span className='text-center'>
                            My ID number (residence card) is required to get coverage for public bicycle injury insurance
                        </span>
                    </div>
                </div>
                <div className="item_Group col-sm-4 col-lg-4">
                    <div className='card_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-provisions-icon3.svg'} alt=""/>
                        <p>Easy Card / All-in-One Card</p>
                        <span className='text-center'>
                            The official website only provides binding e-tickets. If you want to use a credit card or pay electronically
                        </span>
                    </div>
                </div>
            </div>
            <div style={{marginTop:50}}></div>
            <hr style={{width:'50%', color:'white', margin:'auto'}}/>
            <h3 className=' text-center text-light process mt-5 mb-5'>Registration process</h3>
            <div className="row process_sign">
                <div className=" process_sign_card col-sm-6 col-lg-2">
                    <div className='process_sign_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-inner-icon1-3.svg'} alt=""/>
                        <span className='text-center'>
                            Click "I want to rent a car" in the function list"
                        </span>
                    </div>
                </div>
                <div className=" process_sign_card col-sm-6 col-lg-2">
                    <div className='process_sign_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-inner-icon1-1.svg'} alt=""/>
                        <span className='text-center'>
                            Click "Join Member"
                        </span>
                    </div>
                </div>
                <div className=" process_sign_card col-sm-6 col-lg-2">
                    <div className='process_sign_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-inner-icon1.svg'} alt=""/>
                        <span className='text-center'>
                            Read membership terms
                        </span>
                    </div>
                </div>
                <div className=" process_sign_card col-sm-6 col-lg-2">
                    <div className='process_sign_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-inner-icon3.svg'} alt=""/>
                        <span className='text-center'>
                            Fill in member information
                        </span>
                    </div>
                </div>
                <div className=" process_sign_card col-sm-6 col-lg-2">
                    <div className='process_sign_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-inner-icon4.svg'} alt=""/>
                        <span className='text-center'>
                           Put card
                        </span>
                    </div>
                </div>
                <div className=" process_sign_card col-sm-6 col-lg-2">
                    <div className='process_sign_item'>
                        <img src={'https://www.youbike.com.tw/region/assets/images/register-inner-icon5.svg'} alt=""/>
                        <span className='text-center'>
                            Complete registration
                        </span>
                    </div>
                </div>

            </div>
            <div className="row container text-center mt-5 d-flex justify-content-center" style={{margin:"auto"}}>
                <div className="col-sm-6 col-lg-6 ">
                    <Link className='todo' to='/ecobicycle'>
                        <span>Back Home</span>
                    </Link>
                </div>
                <div className="col-sm-6 col-lg-6">
                    <Link to='new_signin'>
                        <span>Experience now</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EcoSignin;