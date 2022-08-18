import React from "react";
import "../Footer/Footer.css";
import {Col, Container, Row} from "react-bootstrap";
import logo from "../Header/image/leaf-icon.png"
import {Link} from "react-router-dom";


function Footer() {
    return (
        <>
            <Container>
                    <footer className="py-3 my-4 mb-auto">
                        <ul className="nav justify-content-center border-bottom border-top pb-3 mb-3 mt-5">
                            <li className="nav-item"><Link to={'/'} onClick={(e)=>{e.preventDefault(); window.location.replace("/#home")}} className="nav-link px-2 text-muted">Home</Link></li>
                            <li className="nav-item"><Link to={'/buyweb'} className="nav-link px-2 text-muted">Buy a Card</Link></li>
                            <li className="nav-item"><Link to={'/'} onClick={(e)=>{e.preventDefault(); window.location.replace("/#faq")}} className="nav-link px-2 text-muted">FAQs</Link></li>
                            <li className="nav-item"><Link to={'/'} onClick={(e)=>{e.preventDefault(); window.location.replace("/#contact")}} className="nav-link px-2 text-muted">Contact us</Link></li>
                        </ul>
                        <p className="text-center text-muted">
                            <img src={logo} alt={logo} width="3%"/>
                            &copy; 2022 EcoBicycle
                        </p>
                    </footer>
            </Container>
        </>
    );
}

export default Footer;
