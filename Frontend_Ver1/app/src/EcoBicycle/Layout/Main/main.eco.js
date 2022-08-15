import React from 'react';
import './main.eco.scss'
import '../../../Components/GlobalStyles/GlobalStyles.scss'
import AddCardIcon from '@mui/icons-material/AddCard';
import { useTypewriter} from 'react-simple-typewriter'
import {Link} from "react-router-dom";
import PaidIcon from '@mui/icons-material/Paid';
const MainEco = () => {
    const {text} = useTypewriter({
        words: ['Hello', 'Today I would like to ...','Hello', 'Today I would like to ...','Hello', 'Today I would like to ...','Hello', 'Today I would like to ...', ],
        loop: 10
    })
    return (
        <div className=' row main_eco'>
            <div className='text-center text-light mt-5 col-sm-12 main_eco_content'>
                <h1>Welcome to EcoBicycle Rentail !</h1>
                {/*<span> {text}</span>*/}
            </div>
            <div className='mt-5 row main_eco_card'>
                <div className=' row col-sm-12 col-md-12 col-lg-6 buy_card'>
                    <h3 className='text-center'>Card</h3>
                    <div className='col-lg-6'>
                        <Link className='to_link'
                              to='buy_card'>
                            <PaidIcon/>
                            <br/>
                            <span className='text-center'>Buy a card</span>
                        </Link>
                    </div>
                    <div className='col-lg-6'>
                        <Link className='to_link'
                              to='buy_card'>
                            <AddCardIcon/>
                            <br/>
                            <span className='text-center'>Top up to card</span>
                        </Link>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-4'>
                    <h3 className='text-center'>Bice</h3>
                    <div>
                        <h1>222</h1>
                    </div>
                    <div>
                        <h1>Top up to card</h1>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MainEco;