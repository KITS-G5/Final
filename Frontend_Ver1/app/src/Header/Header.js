import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "./image/leaf-icon.png"
import Footer from "../Footer/Footer";
import {Outlet} from "react-router";
import "./header_style.css";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">How it works</Nav.Link>
                            <Nav.Link href="#link">Search</Nav.Link>
                            <NavDropdown title="Buy a card" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Prepaid</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Postpaid
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#link">Check your card</Nav.Link>
                            <Nav.Link href="#link">Contact us</Nav.Link>
                            <Nav.Link as={NavLink} to='/signin'>Sign in</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
            <Footer/>
        </>
    );
};
export default Header;