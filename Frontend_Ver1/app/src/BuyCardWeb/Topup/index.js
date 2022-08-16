import {Button, Col, Container, Dropdown, FormCheck, FormControl, FormLabel, FormSelect, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import './topup.css';
import {Link} from "react-router-dom";

const Topup = () => {
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [output, setOutput] = useState(0);

    useEffect(()=>{
        let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + from;
        fetch(url)
            .then(res => res.json())
            .then(data => setInfo(data))
    },[from])
    const convert = () => {
        let rate = 1;
        if (from == "usd.json") {
            rate = info.usd.vnd;
        } else if (from == "eur.json") {
            rate = info.eur.vnd;
        }
        setOutput(input * rate);
    };
    return (
        <>
            <Container fluid>
                <Row className={'topUpHeader mt-5'}>
                    <h1>Top up your prepaid card</h1>
                </Row>
                <Row className={'mt-5'}>
                    <Col md={2} className={'label'}>
                        <FormLabel>
                            Card number
                        </FormLabel>
                    </Col>
                    <Col md={7}>
                        <FormControl type={"text"}/>
                    </Col>
                    <Col md={3}>
                        <Button variant={"secondary"}>Validate</Button>
                    </Col>
                </Row>
                <Row className={'mt-5'}>
                    <Col md={2} className={'label'}>
                        Select currency to pay
                    </Col>
                    <Col md={2} style={{textAlign: "center"}}>
                        <FormCheck inline label={"VND"} name={"curr"} type={"radio"} value={"vnd.json"} onChange={(e)=>setFrom(e.target.value)}/>
                    </Col>
                    <Col md={2} style={{textAlign: "center"}}>
                        <FormCheck inline label={"USD"} name={"curr"} type={"radio"} value={"usd.json"} onChange={(e)=>setFrom(e.target.value)}/>
                    </Col>
                    <Col md={2} style={{textAlign: "center"}}>
                        <FormCheck inline label={"EUR"} name={"curr"} type={"radio"} value={"eur.json"} onChange={(e)=>setFrom(e.target.value)}/>
                    </Col>
                    <Col md={2} style={{textAlign: "center"}}>
                        <FormCheck inline label={"GBP"} name={"curr"} type={"radio"} value={"gbp.json"} onChange={(e)=>setFrom(e.target.value)}/>
                    </Col>
                </Row>
                <Row className={'mt-5'}>
                    <Col md={2} className={'label'}>
                        How much are you paying?
                    </Col>
                </Row>
                <Row className={'mt-3 mb-3'}>
                    <Col md={5}>
                        <div className={'input-group ms-auto'} style={{width: "50%"}}>
                            <input type={"text"} className={'form-control'} aria-describedby={"curr1"} onChange={(e)=> setInput(e.target.value)}/>
                            <span className={'input-group-text'} id={"curr1"}>USD</span>
                        </div>
                    </Col>
                    <Col md={1} className={'ms-auto me-auto mt-auto mb-auto'} style={{textAlign: "center", fontSize: "1.5em"}}>
                        =
                    </Col>
                    <Col md={5}>
                        <div className={'input-group'} style={{width: "50%"}}>
                            <input type={"text"} className={'form-control'} aria-describedby={"curr2"} disabled value={output.toLocaleString() + " VND"}/>
                            <span className={'input-group-text'} id={"curr2"}>VND</span>
                        </div>
                    </Col>
                    <div style={{textAlign: "center"}} className={'mt-3'}>
                        <Button variant={"success"} onClick={convert}>
                            Convert
                        </Button>
                    </div>
                </Row>
                <Row>
                    <Col md={12} style={{textAlign: "center"}}>
                        <Link to={'/pay/' + output}>
                            <Button variant={"danger"} size={"lg"}>TOP UP</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Topup;