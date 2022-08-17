import {Button, Col, Container, FormCheck, FormControl, FormLabel, Row, Table} from "react-bootstrap";
import {useParams} from "react-router";
// import Payeezy from "react-payeezy";

const PaymentMethod = () => {
    const onToken = (token) => {
        fetch('/save-payeezy-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                alert(`We are in business, ${data.email}`);
            });
        });
    };
    const params = useParams();
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <h1>Payment method</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <FormLabel>Card number</FormLabel>
                        <FormControl type={'text'}/>
                        <FormLabel>Name on card</FormLabel>
                        <FormControl type={'text'}/>
                        <FormLabel>CCV</FormLabel>
                        <FormControl type={'password'}/>
                        <FormLabel>Expiration date</FormLabel>
                        <input className={'form-control'} type={'month'}/>
                    </Col>
                    <Col md={4} style={{border: "1px gray solid", width: "20%", textAlign:"center"}} className={'me-auto ms-auto'}>
                        <Table className={'table-borderless'}>
                            <thead>
                            <tr>
                                <th style={{fontSize: "2rem", textAlign: "left"}}>Summary</th>
                            </tr>
                            </thead>
                            <tbody style={{width: "100%"}}>
                            <tr style={{textAlign: "left"}}>
                                <td>Card top up:</td>
                            </tr>
                            <tr style={{textAlign: "left"}}>
                                <td> {params.output.toLocaleString()} VND</td>
                            </tr>
                            {/*<Button style={{marginTop: "5rem"}}>Submit</Button>*/}
                            {/*<Payeezy*/}
                            {/*    token={this.onToken}*/}
                            {/*    PayeezyApiKey = */}
                            {/*/>*/}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default PaymentMethod;