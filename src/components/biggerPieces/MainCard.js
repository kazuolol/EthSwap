import React, { useState } from 'react';
import { Button, Card } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'


const MainCard = ({ account, ethBalance, tokenBalance }) => {
    console.log(tokenBalance)
    return (
        <div className="centered">
        <Card loading width={350} height={350}>
        <h1>Eth Swap!</h1>
        <h5>Welcome, {account}</h5>
            <form className="form">
                <div className="input1">
                    <label name="input1" className="inputLabel">{ethBalance} ETH</label>
                    <input
                        id="input1"
                        type="text"
                        className="formInput"
                        placeholder="0"
                        required />
                </div>
                    <div className="input2">
              
                   
                    <label name="input2">{tokenBalance} tokens</label>
                    <input
                        id="input2"
                        type="text"
                        className="formInput"
                        placeholder="0"
                        required />
               
                <Button type="submit" className="submitButton">Swap</Button>
                </div>
            </form>
           
        </Card>
        </div>




    )
}

export default MainCard;

