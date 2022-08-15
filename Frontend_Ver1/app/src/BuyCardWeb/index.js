import {Button, Container, Col, Row} from "react-bootstrap";
import "./buycardweb.css";

const BuyCardWeb = () => {
    return (
        <>
            <Container fluid className={'p-0'}>
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
                        <Col md={8}>
                            <h1>What is an EcoBicycle Rental Card?</h1>
                            <h4>An EcoBicycle Rental Card is a smartcard. It is a quick and easy way for you to pay for
                                all your biking needs at any EcoBicycle station. Put money on your rental card or link
                                it to your bank account and you're ready to go!</h4>
                            <Button variant={"success"}>
                                Buy an EcoBicycle Rental Card
                            </Button>
                        </Col>
                        {/*edit backcard on paint.net*/}
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default BuyCardWeb;