import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "./image/leaf-icon.png"
import Footer from "../Footer/Footer";
import {Outlet} from "react-router";
import "./header_style.css";
import {Link, NavLink} from "react-router-dom";

const Header = () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/" onClick={(e) => {
                                e.preventDefault();
                                window.location.replace("/#how");
                            }}>How it works</Nav.Link>
                            <Nav.Link>
                                <Link style={{textDecoration: "none", color: "gray"}} to="/search">
                                    Search
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link style={{textDecoration: "none", color: "gray"}} to="/buyweb">
                                    Buy a card
                                </Link>
                            </Nav.Link>
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