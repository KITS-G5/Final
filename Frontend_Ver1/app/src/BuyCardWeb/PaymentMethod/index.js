import {Button, Container, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import './paymentMethod.css';
import constantUrl from "../../Components/ConstantUrl";

const PaymentMethod = () => {
    const params = useParams();
    const nav = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const onSubmit = () => setShow(true);
    const handleClose = () => setShow(false);
    const [cardData, setCardData] = useState([]);
    const [cardId, setCardId] = useState("");
    useEffect(() => {
        let url = "/api/v1/cards/user/" + params.cardNo;
        fetch(constantUrl + url)
            .then(res => res.json())
            .then(data => setCardData(data));
    },[]);
    const payHandle = () => {
        let newBalance = parseInt(params.output);
        const requestOpt = {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        };
        // let url = "http://localhost:8080/api/v1/cards/" + cardId
        let url = "/api/v1/topUpCard/" + params.cardNo + "/" + parseInt(params.output);
        console.log(url)
        fetch(constantUrl + url, requestOpt)
            .then(res => res.json())
            .then();
        setShow2(true);
    };
    const handleClose2 = () => setShow2(false);
    const navBack = () => {
        nav(-1);
    };
    const navHome = () => {
        nav("/");
    };
    return (
        <>
            <Container fluid>
                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="card p-3 payMethCard">
                            <p className="mb-0 fw-bold h4">Payment Methods</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card p-3 payMethCard">
                            <div className="card-body  p-0 payMethCard">
                                <p>
                                    <a className="payMethButton btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                                       data-bs-toggle="collapse" href="#collapseExample" role="button"
                                       aria-expanded="true"
                                       aria-controls="collapseExample">
                                        <span className="fw-bold">PayPal</span>
                                        <span className="fab fa-cc-paypal">
                                </span>
                                    </a>
                                </p>
                                <div className="collapse p-3 pt-0" id="collapseExample">
                                    <div className="row">
                                        <div className="col-12  payMethForm">
                                            <p className="h4 mb-0">Summary</p>
                                            <p className="mb-0"><span className="fw-bold">Top Up Card: </span><span
                                                className="c-green">{params.cardNo} </span></p>
                                            <p className="mb-0"><span className="fw-bold">Price:</span><span
                                                className="c-green"> {parseInt(params.output).toLocaleString()} VND</span></p>
                                            <div className={'form__div'}>
                                                <input type="email" className="form-control mt-2"
                                                       placeholder=" "
                                                />
                                                <label htmlFor="" className="form__label">Email</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body  p-0 payMethCard">
                                <p>
                                    <a className="payMethButton btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                                       data-bs-toggle="collapse" href="#collapseExample" role="button"
                                       aria-expanded="true"
                                       aria-controls="collapseExample">
                                        <span className="fw-bold">Credit Card</span>
                                        <span className="">
                                    <span className="fab fa-cc-amex"></span>
                                    <span className="fab fa-cc-mastercard"></span>
                                    <span className="fab fa-cc-discover"></span>
                                </span>
                                    </a>
                                </p>
                                <div className="collapse show p-3 pt-0" id="collapseExample">
                                    <div className="row">
                                        <div className="col-lg-5 mb-lg-0 mb-3">
                                            <p className="h4 mb-0">Summary</p>
                                            <p className="mb-0"><span className="fw-bold">Top Up Card:</span><span
                                                className="c-green"> {params.cardNo}</span>
                                            </p>
                                            <p className="mb-0">
                                                <span className="fw-bold">Price:</span>
                                                <span className="c-green"> {parseInt(params.output).toLocaleString()} VND</span>
                                            </p>
                                        </div>
                                        <div className="col-lg-7">
                                            <form action="" className="form payMethForm"
                                                  onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form__div">
                                                            <input type="text" className="form-control"
                                                                   placeholder=" " {...register("cardNumber", {
                                                                required: "Card number required",
                                                                minLength: 15,
                                                                maxLength: 16
                                                            })} />
                                                            {errors.cardNumber?.type === "required" && "Card number required"}
                                                            {errors.cardNumber?.type === "minLength" && "Card number is too short"}
                                                            {errors.cardNumber?.type === "maxLength" && "Card number is too long"}
                                                            <label htmlFor="" className="form__label">Card
                                                                Number</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="form__div">
                                                            <input type="text" className="form-control"
                                                                   placeholder=" " {...register("expiry", {
                                                                required: true,
                                                                pattern: /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/
                                                            })}/>
                                                            {errors.expiry?.type === "required" && "Date required"}
                                                            {errors.expiry?.type === "pattern" && "Invalid date"}
                                                            <label htmlFor="" className="form__label">MM /
                                                                yy</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="form__div">
                                                            <input type="password" className="form-control"
                                                                   placeholder=" " {...register("cvv", {
                                                                required: true,
                                                                pattern: /^\d/,
                                                                minLength: 3,
                                                                maxLength: 4
                                                            })}/>
                                                            {errors.cvv && "Invalid CVV code"}
                                                            <label htmlFor="" className="form__label">cvv
                                                                code</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form__div">
                                                            <input type="text" className="form-control"
                                                                   placeholder=" " {...register("name", {required: true})} />
                                                            {errors.name && "Name required"}
                                                            <label htmlFor="" className="form__label">name on the
                                                                card</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div>
                                                            <input type={"submit"}
                                                                   className={'payMethButton btn btn-primary w-100'}
                                                                   value={"Submit"}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="payMethButton btn btn-danger payment" onClick={payHandle}>
                            Make Payment
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Validation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your card had been successfully validated</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your payment is successful</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={navBack}>
                            Go back
                        </Button>
                        <Button variant="secondary" onClick={navHome}>
                            Home
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};
export default PaymentMethod;