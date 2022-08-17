import {
    Button,
    Col,
    Container,
    Dropdown,
    FormCheck,
    FormControl,
    FormLabel,
    FormSelect,
    Modal,
    Row
} from "react-bootstrap";
import {useEffect, useState} from "react";
import './topup.css';
import {Link} from "react-router-dom";

const Topup = () => {
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [output, setOutput] = useState(0);
    const [cardNo, setCardNo] = useState(0);
    const [show, setShow] = useState(false);
    const [cardData, setCardData] = useState([]);
    let cardList = [];
    let cardCheck = false;
    // const validateClick = () => setShow(true);
    useEffect(() => {
        let url = "http://localhost:8080/api/v1/cards";
        fetch(url)
            .then(res => res.json())
            .then(data => setCardData(data));
    },[]);
    cardList = cardData.filter((item) => {
        return item.id == cardNo;
    });
    cardCheck = cardList.length !== 0;

    const ValidateClick = () => {
        setShow(true)
    };
    const validateClose = () => setShow(false);
    useEffect(()=>{
        let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + from +".json";
        fetch(url)
            .then(res => res.json())
            .then(data => setInfo(data))
    },[from])
    const convert = () => {
        let rate = 1;
        if (from == "usd") {
            rate = info.usd.vnd;
        } else if (from == "eur") {
            rate = info.eur.vnd;
        } else if (from == "gbp") {
            rate = info.gbp.vnd;
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
                        <input name='cardNo' className={'form-control'} onChange={(e)=>setCardNo(e.target.value)}/>
                    </Col>
                    <Col md={3}  className={'text-center'}>
                        <Button className={'buttonVal'} variant={"secondary"} onClick={ValidateClick}>Validate</Button>
                    </Col>
                </Row>
                <Row className={'mt-5'}>
                    <Col md={2} className={'label'}>
                        Select currency to pay
                    </Col>
                    <Col md={2} style={{textAlign: "center"}}>
                        <FormCheck inline label={"VND"} name={"curr"} type={"radio"} value={"vnd"} onChange={(e)=>setFrom(e.target.value)}/>
                    </Col>
                    <Col md={2} style={{textAlign: "center"}}>
                        <FormCheck inline label={"USD"} name={"curr"} type={"radio"} value={"usd"} onChange={(e)=>setFrom(e.target.value)}/>
                    </Col>
                    <Col md={2} style={{textAlign: "center"}}>
                        <FormCheck inline label={"EUR"} name={"curr"} type={"radio"} value={"eur"} onChange={(e)=>setFrom(e.target.value)}/>
                    </Col>
                    <Col md={2} style={{textAlign: "center"}}>
                        <FormCheck inline label={"GBP"} name={"curr"} type={"radio"} value={"gbp"} onChange={(e)=>setFrom(e.target.value)}/>
                    </Col>
                </Row>
                <Row className={'mt-5'}>
                    <Col md={2} className={'label'}>
                        How much are you paying?
                    </Col>
                </Row>
                <Row className={'mt-3 mb-3'}>
                    <Col md={5}>
                        <div className={'input-group ms-auto inputLeft'} style={{width: "50%"}}>
                            <input type={"text"} className={'form-control'} aria-describedby={"curr1"} onChange={(e)=> setInput(e.target.value)}/>
                            <span className={'input-group-text'} id={"curr1"} style={{textTransform: "uppercase"}}>{from}</span>
                        </div>
                    </Col>
                    <Col md={1} className={'ms-auto me-auto mt-auto mb-auto'} style={{textAlign: "center", fontSize: "1.5em"}}>
                        =
                    </Col>
                    <Col md={5}>
                        <div className={'input-group inputRight'} style={{width: "50%"}}>
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
                        <Link to={'/pay/' + cardNo +"/"+ output}>
                        {/*<Link to={{pathname: "/pay", state: {cardNo: "cardNo",cash: output}}}>*/}
                            <Button variant={"danger"} size={"lg"}>TOP UP</Button>
                        </Link>
                    </Col>
                </Row>
                <Modal show={show} onHide={validateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Validation</Modal.Title>
                    </Modal.Header>
                    {cardCheck == true ? (
                        <Modal.Body>Your card had been successfully validated</Modal.Body>
                    ): (
                        <Modal.Body>Your card does not exists</Modal.Body>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={validateClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};
export default Topup;