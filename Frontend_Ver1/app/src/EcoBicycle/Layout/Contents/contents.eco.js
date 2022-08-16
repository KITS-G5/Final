import React from 'react';
import { Fade } from 'react-slideshow-image';
import "./contents.eco.scss"
import 'react-slideshow-image/dist/styles.css'
import {Link} from 'react-router-dom'


const ContentsEco = () => {
    const images = [
        "https://www.youbike.com.tw/region/_next/image?url=%2Fregion%2Fassets%2Fimages%2Flogin_icon.svg&w=96&q=75",
        "https://www.youbike.com.tw/region/assets/images/photos/equipment/2/02.jpg",
        "https://www.youbike.com.tw/region/assets/images/photos/equipment/2/03.jpg",
        "https://www.youbike.com.tw/region/assets/images/photos/equipment/2/04.jpg",
        "https://www.youbike.com.tw/region/assets/images/photos/equipment/2/05.jpg",
        "https://www.youbike.com.tw/region/assets/images/photos/equipment/2/14.jpg"
    ];

    return (
        <div className='container-fluid' style={{padding:'unset'}}>
            <div>
                <Fade>
                    <div className="each-slide">
                        <div>
                            <img src={images[0]} />
                        </div>
                        <div className='contentss'>
                            <div className='text_contents'>
                                <p className='text-center text-light'>Sign up login</p><br/>
                                <span className='text-center text-light'>Register as a member using the official APP, website or EcoBicycle</span>
                                <div className='res_content d-flex justify-content-around mt-5  text-light'>
                                    <Link to='login'>
                                        <span>Login</span>
                                    </Link>
                                    <Link to='sign up'>
                                        <span>Sign up</span>
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="each-slide">
                        <div>
                            <img src={images[1]} />
                        </div>
                        <div className='contentss'>
                            <div className='text_contents'>
                                <p className='text-center text-light'>Sign up login</p><br/>
                                <span className='text-center text-light'>Register as a member using the official APP, website or EcoBicycle</span>
                                <div className='res_content d-flex justify-content-around mt-5  text-light'>
                                    <Link to='login'>
                                        <span>Login</span>
                                    </Link>
                                    <Link to='sign up'>
                                        <span>Sign up</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="each-slide">
                        <div>
                            <img src={images[2]} />
                        </div>
                        <div className='contentss'>
                            <div className='text_contents'>
                                <p className='text-center text-light'>Sign up login</p><br/>
                                <span className='text-center text-light'>Register as a member using the official APP, website or EcoBicycle</span>
                                <div className='res_content d-flex justify-content-around mt-5  text-light'>
                                    <Link to='login'>
                                        <span>Login</span>
                                    </Link>
                                    <Link to='sign up'>
                                        <span>Sign up</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="each-slide">
                        <div>
                            <img src={images[3]} />
                        </div>
                        <div className='contentss'>
                            <div className='text_contents'>
                                <p className='text-center text-light'>Sign up login</p><br/>
                                <span className='text-center text-light'>Register as a member using the official APP, website or EcoBicycle</span>
                                <div className='res_content d-flex justify-content-around mt-5  text-light'>
                                    <Link to='login'>
                                        <span>Login</span>
                                    </Link>
                                    <Link to='sign up'>
                                        <span>Sign up</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="each-slide">
                        <div>
                            <img src={images[4]} />
                        </div>
                        <div className='contentss'>
                            <div className='text_contents'>
                                <p className='text-center text-light'>Sign up login</p><br/>
                                <span className='text-center text-light'>Register as a member using the official APP, website or EcoBicycle</span>

                                <div className='res_content d-flex justify-content-around mt-5  text-light'>
                                    <Link to='login'>
                                        <span>Login</span>
                                    </Link>
                                    <Link to='sign up' className='text-decoration-none'>
                                        <span>Sign up</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </Fade>
            </div>
        </div>

    );
};

export default ContentsEco;