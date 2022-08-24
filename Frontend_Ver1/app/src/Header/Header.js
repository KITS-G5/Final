import {Container, Nav, Navbar} from "react-bootstrap";
import logo from "./image/leaf-icon.png"
import Footer from "../Footer/Footer";
import {Outlet} from "react-router";
import "./header_style.css";
import {Link, NavLink} from "react-router-dom";
import DarkMode from "../Home/darkMode";
import Dropdown from 'react-bootstrap/Dropdown';
import {useContext, useState} from "react";
import {LoggerContext} from "../Context/GlobalContext";
import {useEffect} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    const {cardLogin,logger } = useContext(LoggerContext)
    const [admin, setAdmin] = useState([])

    const [todos, setTodos] = useState(() => {
        //Lấy từ local
        const dataLocal = localStorage.getItem('user_info')
        if (dataLocal) {
            //trả về đối tượng JSON được phân tích lại thành JS
            return JSON.parse(dataLocal)
        } else {
            return []
        }
    })
    const cardNumber = todos.config.data.slice(12,31)
    console.log(todos.config.data.slice(12,31))
    useEffect(() => {
        let url = 'http://localhost:8080/api/v1/cards/user/' + cardNumber
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then((res) => {
                setAdmin(res)
                console.log(res.cardNum)
            })
    },[]);

    const userLink = () => {
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle >
                        <AccountCircleIcon/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#">{admin.cardNum}</Dropdown.Item>
                        <Dropdown.Item href={`/admin/user/${cardNumber}`}>Profile</Dropdown.Item>
                        <Dropdown.Item href="#">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
    return (
        <>
            <Navbar expand="lg" style={{position: "sticky", top: 0, zIndex:"1"}}>
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
                            {cardNumber ? <Nav.Link as={NavLink} to={`/admin/user/${cardNumber}`}>{userLink}</Nav.Link> :  <Nav.Link as={NavLink} to='/signin'>Sign in </Nav.Link> }


                            <DarkMode/>
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