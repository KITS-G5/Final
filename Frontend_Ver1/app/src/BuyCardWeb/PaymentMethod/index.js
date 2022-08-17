import {Button, Col, Container, FormCheck, FormControl, FormLabel, Row, Table, Modal} from "react-bootstrap";
import {useParams} from "react-router";
// import Payeezy from "react-payeezy";

const PaymentMethod = () => {
    const params = useParams();
    const { register, formState:{errors}, handleSubmit } = useForm();
    const [show, setShow] = useState(false);
    const onSubmit = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <>
            <Container fluid>
                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="card p-3">
                            <p className="mb-0 fw-bold h4">Payment Methods</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card p-3">
                            <div className="card-body border p-0">
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
                                        <div className="col-12">
                                            <p className="h4 mb-0">Summary</p>
                                            <p className="mb-0"><span className="fw-bold">Top Up Card:</span><span
                                                className="c-green">{params.cardNo} </span></p>
                                            <p className="mb-0"><span className="fw-bold">Price:</span><span
                                                className="c-green"> {params.output} VND</span></p>
                                            <input className={'form-control mt-2'} type={'email'} placeholder={'Email'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body border p-0">
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
                                                <span className="c-green"> {params.output} VND</span>
                                            </p>
                                        </div>
                                        <div className="col-lg-7">
                                            <form action="" className="form payMethForm" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form__div">
                                                            <input type="text" className="form-control" placeholder=" " {...register("cardNumber", {required:"Card number required", minLength: 15, maxLength: 16})} />
                                                            {errors.cardNumber?.type === "required" && "Card number required"}
                                                            {errors.cardNumber?.type === "minLength" && "Card number is too short"}
                                                            {errors.cardNumber?.type === "maxLength" && "Card number is too long"}
                                                                <label htmlFor="" className="form__label">Card
                                                                    Number</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="form__div">
                                                            <input type="text" className="form-control" placeholder=" " {...register("expiry", {required: true, pattern: /^(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/})}/>
                                                            {errors.expiry?.type === "required" && "Date required"}
                                                            {errors.expiry?.type === "pattern" && "Invalid date"}
                                                                <label htmlFor="" className="form__label" >MM /
                                                                    yy</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="form__div">
                                                            <input type="password" className="form-control"
                                                                   placeholder=" " {...register("cvv", {required: true, pattern: /^\d/,minLength: 3, maxLength: 4})}/>
                                                            {errors.cvv && "Invalid CVV code"}
                                                                <label htmlFor="" className="form__label">cvv
                                                                    code</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form__div">
                                                            <input type="text" className="form-control" placeholder=" " {...register("name", {required: true})} />
                                                            {errors.name && "Name required"}
                                                                <label htmlFor="" className="form__label">name on the
                                                                    card</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div>
                                                            <input type={"submit"} className={'payMethButton btn btn-primary w-100'} value={"Submit"}/>
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
                        <div className="payMethButton btn btn-primary payment">
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
            </Container>
        </>
    );
};
export default PaymentMethod;