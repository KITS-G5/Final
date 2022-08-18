import React from 'react';
import {Link} from "react-router-dom";
import './EcoMember.scss'
const EcoMembership = () => {
    return (
        <div className='container mt-5' >
            <h3 className='text-center mb-5'>Membership Terms</h3>
            <div style={{overflowY:'scroll',padding:20, height:'100vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                <p>10811</p>
                <span>
                    Public bicycle rental system YouBike member stereotype contract
                </span>
                <p>content services</p>
                <span>
                    YouBike is an auto rental service provided by Smile Bicycle Co., Ltd. (hereinafter referred to as “the company”) is authorized by the county and city governments where the public station is located. bicycle rental service (hereinafter referred to as the "Service"). In addition to the public bicycle rental service registered by the member in the county and city, the member can also use the service at compatible systems in other areas as agreed by the company.
                </span>
                <p>Article 1 Definition of Terms</p>
                <span>(1) Members: Refers to those who complete the registration process on YouBike official website, service center, Kiosk (automatic service machine), APP, etc.</span><br/>
                <span>(2) Car rental: Refers to members who use designated e-tickets/e-payments to rent public bicycles at public bike stations where the company provides the service.</span><br/>

                <div className="row container next_teps text-center mt-5 d-flex justify-content-center" style={{margin:"auto"}}>
                    <div className=" item_todo col-sm-6 col-lg-6 ">
                        <Link style={{textDecoration:'none', marginTop:100, marginBottom:100}} to='/ecobicycle'>
                        <span style={{
                            padding:8,
                            backgroundColor:'rgb(128,234,111)',
                            borderRadius:10,
                            fontSize:'1.3rem',
                            color:'whitesmoke'
                        }}>Back Home</span>
                        </Link>
                    </div>
                    <div className="col-sm-6 col-lg-6">
                        <Link style={{textDecoration:'none', marginTop:100, marginBottom:100}} to='create_account'>
                        <span style={{
                            padding:8,
                            backgroundColor:'rgb(128,234,111)',
                            borderRadius:10,
                            fontSize:'1.3rem',
                            color:'whitesmoke'
                        }}>Next steps</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EcoMembership;