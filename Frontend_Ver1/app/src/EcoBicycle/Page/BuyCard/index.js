import React from 'react';
import {Link} from "react-router-dom";
import '../Main/main.eco.scss'
import './buycard.eco.scss'
import '../../../Components/Authentication/Signin/style.scss'
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';

import CreditScoreIcon from "@mui/icons-material/CreditScore";
import BadgeIcon from "@mui/icons-material/Badge";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const BuyCardEco = () => {
    return (
        <div className=' row main_eco container' style={{margin:'auto'}}>
            <div className='text-center text-light mt-5 col-sm-12 main_eco_content'>
                <h1>Buy an EcoBicycle Rentail Card !</h1>
                <span>Pick your card type</span>
            </div>
            <div className='mt-5 row main_eco_card'>
                <div className=' row col-sm-12 col-md-12 col-lg-12 buy_card'>
                    <div className='col-lg-6 card_item'>
                        <Link className='to_link'
                              to='prepaid'>
                            <LocalAtmIcon/>
                            <br/>
                            <span className='text-center'>Prepaid</span>
                        </Link>
                    </div>
                    <div className='col-lg-6 card_item'>
                        <Link className='to_link'
                              to='buy_card'>
                            <PaymentIcon/>
                            <br/>
                            <span className='text-center'>Postpaid</span>
                        </Link>
                    </div>
                </div>
                {/*<div style={{padding:10, display:"flex", justifyContent:"flex-end"}}>
                    <Link to='/' >
                        <button className="learn-more">
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">Go to home !</span>
                        </button>
                    </Link>
                </div>*/}

                    <Link to='/ecobicycle'>
                        <button className='eco-card'>
                            Return
                        </button>
                    </Link>
            </div>
        </div>
    );
};

export default BuyCardEco;