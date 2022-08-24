import {Button, Col, Container, Row} from "react-bootstrap";
import "./buycardweb.css";
import card from "./img/frontcard.png";
import cardback from "./img/backend.png";
import {Link} from "react-router-dom";

const BuyCardWeb = () => {
    return (
        <>
            <Container fluid className={'p-0'} style={{overflow: "hidden"}}>
                <div className={'buyBanner ms-0 p-0'}>
                    <div className={'headerText ms-auto me-auto'}>
                        <h1>
                            EcoBicycle Rental Card
                        </h1>
                        <h3>
                            First step to a greener journey through the streets of Vietnam
                        </h3>
                    </div>
                </div>
                <div className={'buyWhat'}>
                    <Row>
                        <Col md={8} className={'buyWhatText'}>
                            <h1>What is an EcoBicycle Rental Card?</h1>
                            <h4 className={'me-auto ms-auto mt-4 mb-5'}>An EcoBicycle Rental Card is a smartcard. It is
                                a quick and easy way for you to pay for
                                all your biking needs at any EcoBicycle station. Put money on your rental card or link
                                it to your bank account and you're ready to go!</h4>
                            <Button variant={"success"}>
                                <Link to={'/buycard'} style={{textDecoration: "none", color: "var(--font-color)"}}>
                                    Buy an EcoBicycle Rental Card
                                </Link>
                            </Button>
                        </Col>
                        <Col md={4} className={'buyWhatImg p-0'}>
                            <img alt="card" src={card} id={"card1"}/>
                            <img alt="cardback" src={cardback} id={"card2"}/>
                        </Col>
                    </Row>
                </div>
                <div className={'howMuch'}>
                    <Row className={'howMuchCosts'}>
                        <Col md={12}>
                            <h1>How much does it costs?</h1>
                            <h4>A rental card costs only 50.000 VND. The card will never expires - it will be yours
                                forever! A card can be either a prepaid or postpaid card. You can get a card directly at
                                one of our rental station in the city.
                            </h4>
                            <h4 className={'mt-3'}>For a prepaid card, you will need to add a minimum of 1.000.000 VND
                                to your card.</h4>
                            <h4 className={'mt-3'}>For a postpaid card, you will need to link your card to a payment
                                processor.</h4>
                        </Col>
                    </Row>
                    <Row className={'howMuchTopUp'}>
                        <Col md={12}>
                            <h1>Top up - add more credit to your card</h1>
                            <h4 className={'mt-3'}>If you run out of credit on your card, it's easy to top up at:</h4>
                            <ul>
                                <h4>
                                    <li>Any of our rental stations - <Link to={'/search'}>find your nearest
                                        station</Link></li>
                                </h4>
                                <h4>
                                    <li>Through the <Link to={'/topup'}>payment portal</Link> on our website</li>
                                </h4>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className={"cancel"}>
                    <Row className={'cancelCard'}>
                        <Col md={12}>
                            <h1>Cancelling your card & unused credits</h1>
                            <h4 className={'mt-3'}>
                                If you would like to cancel this card, simply go to a nearby EcoBicycle station and
                                return it
                            </h4>
                            <h4 className={'mt-3'}>
                                If your card is prepaid and still has credits in it, you can get the remaining amount
                                refunded by <Link to={'/index'} onClick={(e) => {
                                e.preventDefault();
                                window.location.replace("/#contact")
                            }}>contacting us</Link>
                            </h4>
                            <p style={{fontStyle: "italic"}}>
                                *The 50.000 VND you paid for the card will not be refunded
                            </p>
                        </Col>
                    </Row>
                    <Row className={'cancelLost'}>
                        <Col md={12}>
                            <h1>Lost or stolen rental card</h1>
                            <h4 className={'mt-3'}>
                                You can not get refunds for any credit on your lost or stolen prepaid EcoBicycle Rental
                                Card
                            </h4>
                            <h4 className={'mt-3'}>
                                You will need to <Link to={'/index'} onClick={(e) => {
                                e.preventDefault();
                                window.location.replace("/#contact")
                            }}>contact our support</Link> as soon as possible if your
                                postpaid EcoBicycle Rental Card is lost or stolen in order to cancel the link between
                                your card and the payment processor of your choosing
                            </h4>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default BuyCardWeb;