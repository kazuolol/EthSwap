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

                <QRCode className="qr" value={account} size={100} />



            </div>
        )
    }

    const handleClick = (e) => {
        e.preventDefault();
        setVisible(!visible);
    }



    const [visible, setVisible] = useState(false);

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