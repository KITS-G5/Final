import React from "react";
import "../Footer/Footer.css";
import {Col, Container, Row} from "react-bootstrap";
import logo from "../Header/image/leaf-icon.png"


function Footer() {
    return (
        <>
            <Container>
                    <footer className="py-3 my-4 mb-auto">
                        <ul className="nav justify-content-center border-bottom border-top pb-3 mb-3 mt-5">
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
                            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
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
