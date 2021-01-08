import { stringify } from 'querystring';
import React, { useState } from 'react';
import { Dialog, Button, Card, Fab } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import ethLogo from '../../Ethereum-3.gif'

var QRCode = require('qrcode.react');


    

    

function QrButton({ account }) {

    function alert() {
        return (
            <div className="flexbox">
            <div className="alert alert-secondary shadow-soft mb-4 mb-lg-5" role="alert">
            <QRCode value={account} size={100} />
    
            <p class="mb-0">This is your public key, you can scan it to send funds to this account.</p>
            <p></p>
        </div>
        </div>
        )}
    
        const handleClick = (e) => {
            e.preventDefault();
            setVisible(!visible);
        }
    
    

    const [visible, setVisible] = useState(false);
    const date = new Date()

    return (
        <>
            
            {visible == true ? alert() : <p className="logoText">QR ➡️</p>}

            <Fab className="navFab" onClick={handleClick} absolute top right medium>
                <img className="navFabImg" onClick={handleClick} src={ethLogo} width="60px" height="40px" />
            </Fab>

        </>



    )
}

export default QrButton;