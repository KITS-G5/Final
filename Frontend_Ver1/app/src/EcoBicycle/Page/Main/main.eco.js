import React, {useEffect, useState} from 'react';
import './main.eco.scss'
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import BadgeIcon from '@mui/icons-material/Badge';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useTypewriter} from 'react-simple-typewriter'
import {Link, useParams} from "react-router-dom";
import PaidIcon from '@mui/icons-material/Paid';
import CardInfo from "../CardInfo/CardInfo";
const MainEco = () => {



    const {text} = useTypewriter({
        words: ['Hello', 'Today I would like to ...' ],
        loop: 10
    })
    return (

        <div className=' row main_eco container' style={{margin:'auto'}}>

                <div>
                    <div className='text-center  mt-5 col-sm-12 main_eco_content'>
                        <h1>Welcome to EcoBicycle Rental !</h1>
                    </div>
                    <div className='mt-5 row main_eco_card'>
                        <h3 className='text-center fs-1 '>Bike</h3>
                        <div className=' col-sm-12 col-md-12 col-lg-6 buy_card'>
                            <div className='card_item'>
                                <Link className='to_link'
                                      to={`/ecobicycle/rentbike/`}>
                                    <DirectionsBikeIcon/>
                                    <br/>
                                    <span className='text-center' style={{color: "var(--font-color)"}}>Rent a bike</span>
                                </Link>
                            </div>

                        </div>
                        <div className=' col-sm-12 col-md-12 col-lg-6 buy_card'>
                            <div className=' card_item'>
                                <Link className='to_link'
                                      to={`/ecobicycle/return_bike`}>
                                    <ShoppingCartCheckoutIcon/>
                                    <br/>
                                    <span className='text-center' style={{color: "var(--font-color)"}}>Return Bike</span>
                                </Link>
                            </div>
                        </div>
                    </div>

            </div>

        </div>
    );
};

export default MainEco;