
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";



function CardInfo({data}) {

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {data !== null ? <span>Hello {data.name}</span> : 'loading'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Profile </h4>
                    {data !== null ? <div>
                        <span>Name: {data.name}</span><br/>
                        <span>Address : {data.address}</span><br/>
                        <span>Phone : {data.phone} </span><br/>
                    </div> : "loading"}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const [modalShow, setModalShow] = useState(false);

    return (
        <>

            <span onClick={() => setModalShow(true)}>
                Card Info
            </span>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default CardInfo