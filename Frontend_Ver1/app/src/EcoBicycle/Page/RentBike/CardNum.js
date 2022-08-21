import React from 'react';
import card1 from "../../../BuyCardWeb/img/frontcard.png"
import card2 from "../../../BuyCardWeb/img/backend.png"
import "./CardNum.css"

export default function CardNum(){
    return(
        <div className={'d-flex align-items-start justify-content-around cardNum'}>
            <form className={'cardNum-left'}>
                <div className="mb-3">
                    <label htmlFor="cardNum" className="form-label">Card number</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="CVV" className="form-label">CVV</label>
                    <input type="number" className="form-control" />
                </div>
            </form>
            <div className={'cardNum-right'}>
                <img src={card1} alt={'cardIMG'} className={'cardNum-right1'}/>
                <img src={card2} alt={'cardIMG'} className={'cardNum-right2'}/>
            </div>
        </div>
    )
}