import React, { useState } from 'react';
import { Button, Card } from 'ui-neumorphism'
import computer from '../../computer2.gif'
import 'ui-neumorphism/dist/index.css'


const MainCard = ({ account, ethBalance, tokenBalance }) => {

    const date = new Date().toString()
    
    return (
        
        <>
        <div className="right">
        <img className="computer" src={computer} />
        </div>
         
        <div className="centered">
        
        <Card loading width={360} height={370}>
        
        <h1>Eth Swap!</h1>
        
        <h6>Welcome, {account} </h6>
            <form className="form">
                    
                    <label name="input1" className="inputLabel">{ethBalance} Ether</label>
                    <input
                        id="input1"
                        type="text"
                        className="formInput"
                        placeholder="0"
                        required />
                    
                   
                    <label name="input2">{tokenBalance} Tokens</label>
                    <input
                        id="input2"
                        type="text"
                        className="formInput"
                        placeholder="0"
                        required />
               
                <Button type="submit" className="submitButton">🔀</Button>

                
            </form>
           
        </Card>
        </div>
        </>




    )
}

export default MainCard;

