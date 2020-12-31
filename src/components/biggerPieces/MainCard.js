import React, { useState } from 'react';
import { Card } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import QrButton from '../smallerPieces/QrButton'

function MainCard({ account }) {

    const [visible, setVisible] = useState(false);
    return (
        //eventually i want to hit this api with a useHook and useEffect to map through a data state variable and show the current block on mainnet ethereum
        //use this article https://www.robinwieruch.de/react-hooks-fetch-data

        <Card loading width={350} height={350}>

            {/* <QrButton
                className="qrButton"
                account={account} /> */}
                
        </Card>

    )
}

export default MainCard;

