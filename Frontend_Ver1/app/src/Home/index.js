import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./home_style.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowRotateLeft, faBicycle, faCreditCard, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import vGeo from "./vietnam.geo.json";

delete L.Icon.Default.prototype._getIconUrl;

const Home = () => {
    library.add(faCreditCard, faBicycle, faArrowRotateLeft, faMagnifyingGlass);
    const HN_pos = [21.027763, 105.834160]
    const CT_pos = [10.045162, 105.746857]
    const HP_pos = [20.844912, 106.688087]
    const HCM_pos = [10.823099, 106.629662]
    const DN_pos = [16.054407, 108.202164]
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    return (
        <>
            <Container fluid className={"p-0"} style={{overflow: "hidden"}}>
                <div className={'homeBanner ms-0 p-0'}>
                    <div className={"header_text ms-auto me-auto"}>
                        <h2>
                            Never be without a bike!
                        </h2>
                        <h4>
                            Bikes for the occasional and eco-friendly needs.
                        </h4>
                        <Button variant={"success"} className={'header_button mt-5'}>
                            <a href={"#"}>
                                <h1>
                                    Rent one now!
                                </h1>
                            </a>
                        </Button>
                    </div>
                </div>
                <div className={"map"} id={"map"}>
                    <h1>Stations across the country</h1>
                    <Row>
                        <Col md={12} >
                            <MapContainer style={{height: "100vh", width: "100%"}} className={'ms-auto me-auto'} center={HN_pos} zoom={7}
                                          scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={HN_pos}>
                                    <Popup>
                                        Hanoi, 8 stations
                                    </Popup>
                                </Marker>
                                <Marker position={HCM_pos}>
                                    <Popup>
                                        Ho Chi Minh City, 8 stations
                                    </Popup>
                                </Marker>
                                <Marker position={DN_pos}>
                                    <Popup>
                                        Da Nang, 5 stations
                                    </Popup>
                                </Marker>
                                <Marker position={HP_pos}>
                                    <Popup>
                                        Hai Phong, 5 stations
                                    </Popup>
                                </Marker>
                                <Marker position={CT_pos}>
                                    <Popup>
                                        Can Tho, 4 stations
                                    </Popup>
                                </Marker>
                                <GeoJSON key={"vietnam geo"} data={vGeo}/>
                            </MapContainer>
                        </Col>
                    </Row>
                </div>
                <div className={"how"} id={"how"}>
                    <h1 className={"ms-auto me-auto"}>
                        How it works
                    </h1>
                    <div className={"how_text"}>
                        <Row>
                            <div className={'col-md-3 p-0'}>
                                <FontAwesomeIcon className={'how_icon'} icon="fa-magnifying-glass" size={"3x"}/>
                                <h3>Search</h3>
                                <p>
                                    Search for a nearby station with the website
                                </p>
                            </div>
                            <div className={'col-md-3 p-0'}>
                                <FontAwesomeIcon className={'how_icon'} icon="fa-credit-card" size={"3x"}/>
                                <h3>Buy a rental card</h3>
                                <p>
                                    Just buy a rental card to start with
                                </p>
                            </div>
                            <div className={'col-md-3 p-0'}>
                                <FontAwesomeIcon className={'how_icon'} icon="fa-bicycle" size={"3x"}/>
                                <h3>Ride the bike</h3>
                                <p>
                                    Short or long rental. Just tap your card and go
                                </p>
                            </div>
                            <div className={'col-md-3 p-0'}>
                                <FontAwesomeIcon className={'how_icon'} icon="fa-arrow-rotate-left" size={"3x"}/>
                                <h3>Return at the end</h3>
                                <p>
                                    When you are done, just drop your bike off at the nearest station, and end your ride
                                    by tapping the card
                                </p>
                            </div>
                        </Row>
                    </div>
                </div>
                <div className={'faq'}>
                    <Row>
                        <h1 style={{textAlign: "center"}}>
                            F.A.Q.
                        </h1>
                        <Row className={'mt-3'}>
                            <div className={'q col-md-4 p-0'}>
                                <button className={'btn btn-lg btn-secondary rounded-0'} data-bs-toggle="collapse"
                                        data-bs-target="#q1_ans"
                                        aria-expanded="false" aria-controls="q1_ans">
                                    How do I rent a bike?
                                </button>
                                <div className={'collapse'} id="q1_ans">
                                    <p className={'me-auto ms-auto faqContent'}>
                                        Simply get an EcoBicycle rental card and you're good to go! Go to one of our
                                        stations
                                        and buy a card from the machine. You can get either a prepaid or a postpaid
                                        card,
                                        with
                                        their respective payment method outline <span><a href={"#"}>here</a> </span>. At
                                        the
                                        end
                                        of the rental period, you should bring the bike to the nearest station, tap your
                                        card
                                        for payment and you're good to go.
                                    </p>
                                </div>
                            </div>
                            <div className={'q col-md-4 p-0'}>
                                <button className={'btn btn-lg btn-secondary rounded-0'} data-bs-toggle="collapse"
                                        data-bs-target="#q2_ans"
                                        aria-expanded="false" aria-controls="q2_ans">
                                    How much does it costs to rent a bike?
                                </button>
                                <div className={'collapse'} id="q2_ans">
                                    <p className={'me-auto ms-auto faqContent'}>
                                        Our bike rental is merely 2.000 VND/hour, calculated down to the minute. If you
                                        are
                                        using a prepaid card, however, your balance has to be at least 1.000.000 VND to
                                        rent.
                                    </p>
                                </div>
                            </div>
                            <div className={'q col-md-4 p-0'}>
                                <button className={'btn btn-lg btn-secondary rounded-0'} data-bs-toggle="collapse"
                                        data-bs-target="#q3_ans"
                                        aria-expanded="false" aria-controls="q3_ans">
                                    Where can I leave the bike?
                                </button>
                                <div className={'collapse'} id="q3_ans">
                                    <p className={'me-auto ms-auto faqContent'}>
                                        During your rental, you can lock your bike anywhere you want. At the end of your
                                        rental,
                                        please leave your bike at one of our station and finish payment to end your
                                        ride.
                                        Please note that in case of damages or theft, you will be held responsible for
                                        the
                                        bike.
                                    </p>
                                </div>
                            </div>
                        </Row>
                    </Row>
                </div>
                <div className={"contact"}>
                    <h1>Get In Touch</h1>
                    <h4>Have any questions? Got suggestions? Simply want to chat? Contact us with the form below!</h4>
                    <Form>
                        <Row>
                            <Col md={12} className={'mt-3'}>
                                <textarea rows={4} placeholder={"Message"}
                                          className={'contact_message form-control ms-auto me-auto'}></textarea>
                            </Col>
                        </Row>
                        <Row className={'me-auto ms-auto input-group mt-3 contact_input'}>
                            <Col md={4}>
                                <input className={'form-control'} type={"email"} name={"contact_email"}
                                       placeholder={"email"}/>
                            </Col>
                            <Col md={4} className={'me-0 ms-0'}>
                                <input className={'form-control'} type={"text"} name={"full_name"}
                                       placeholder={"Full name"}/>
                            </Col>
                            <Col md={4}>
                                <Button type={"submit"} variant={"secondary"} style={{width: "100%"}}>
                                    Send
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </>
    );
};
export default Home;