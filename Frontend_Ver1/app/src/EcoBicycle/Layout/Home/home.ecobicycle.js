import React from 'react';
import './home.eco.scss'
import {Outlet} from 'react-router-dom'
import logo from "../../../Header/image/leaf-icon.png"
const HomeEcoBicycle = () => {
    return (
        <div className='eco_bie container'>
            {/*
                Header
            */}
            <div className='row header_eco'>
                <div className='mt-3 Logo_eco col-sm-12 col-md-6 col-lg-3'>
                    <img src={logo} alt="" width='50px' height='50px'/>
                    <span  >EcoBicycle</span>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-3'>

                </div>
                <div className='col-sm-12 col-md-6 col-lg-3'>

                </div>
                <div className=' language col-sm-12 col-md-6 col-lg-3'>
                    <div className='language_vn' >
                        <div className='tripple'>
                            <img
                                src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png'}
                                alt=""
                                width='40'
                                height='40'
                                style={{
                                    objectFit:"cover",
                                    borderRadius:'50%'
                            }}/>
                            <span >VN</span>
                        </div>
                        <div
                            style={{borderRight:'1px solid #ffffff', height:30, marginTop:16, marginRight:10 }}></div>
                        <div className='tripple'>
                            <img
                                src={'https://vuongquocanh.com/wp-content/uploads/2018/04/la-co-vuong-quoc-anh.jpg'}
                                alt=""
                                width='40'
                                height='40'
                                style={{
                                    objectFit:"cover",
                                    borderRadius:'50%'
                                }}
                            />
                            <span >EN</span>
                        </div>
                    </div>

                </div>
            </div>
            <Outlet/>
        </div>
    );
};

export default HomeEcoBicycle;