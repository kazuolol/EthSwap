import React, { useState } from 'react';
import { Dialog, Button, Card, Fab } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import ethLogo from '../../Ethereum-3.gif'

var QRCode = require('qrcode.react');




function QrButton({ account }) {

    
        const handleClick = (e) => {
            e.preventDefault();
            setVisible(!visible);
        }
    
    

    const [visible, setVisible] = useState(false);

    // const handleClickOutside = event => {
    //     if (MouseEvent.handleClickOutside) {
    //       setVisible(false);
    //     }
    //   };
    //shows your public key with a little button saying open
    //if you clikc button it shows ypur pub key as a QR code
    //find where to change pub key address

    return (
        <>

            {visible == true ? <QRCode value={account} size={100} /> : <p>Click the logo to display your account info</p>}

            <Fab className="navFab" onClick={handleClick} absolute top right medium>
                <img className="navFabImg" onClick={handleClick} src={ethLogo} width="60px" height="40px" />
            </Fab>

        </>



    )
}

export default QrButton;