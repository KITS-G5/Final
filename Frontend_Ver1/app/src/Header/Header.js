import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "./image/leaf-icon.png"
import Footer from "../Footer/Footer";
import {Outlet} from "react-router";
import "./header_style.css";
import {Link, NavLink} from "react-router-dom";
import DarkMode from "../Home/darkMode";

const Header = () => {
    return (
        <>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <DarkMode/>
                        <Nav className="ms-auto">
                            <Nav.Link href="/" onClick={(e) => {
                                e.preventDefault();
                                window.location.replace("/#how");
                            }} >How it works</Nav.Link>
                            <Nav.Link>
                                <Link  to="/search">
                                    Search
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link  to="/buyweb">
                                    Buy a card
                                </Link>
                            </Nav.Link>
                            <Nav.Link href="/" onClick={(e)=>{e.preventDefault(); window.location.replace("/#contact")}} >
                                {/*<Link  to="/contact">*/}
                                    Contact us
                                {/*</Link>*/}
                            </Nav.Link>
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