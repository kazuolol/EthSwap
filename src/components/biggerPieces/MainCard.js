import React, { useState } from 'react';
import { Button, Card, Switch, TextField, overrideThemeVariables } from 'ui-neumorphism'
import computer from '../../computer2.gif'
import 'ui-neumorphism/dist/index.css'

import { useDarkMode }  from '../../hooks/useDarkMode'


const MainCard = ({ account, ethBalance, tokenBalance }) => {

    // Dark mode

    const [darkMode, setDarkMode] = useDarkMode(true)

    const toggleDarkMode = (e) => {
        e.preventDefault();
        document.body.classList.toggle("dark-mode");
        setDarkMode(!darkMode);
      };

    const date = new Date().toString()
    
    return (
        
        <>
        <div className="right">
        <img className="computer" src={computer} />
        </div>
         
        <div className="centered">
        
        <Card className="ui-card" width={360} height={400}>
        
        <h1>Eth Swap!</h1>
        
        <h6>Welcome, {account} </h6>
            <form className="form">
                    <div>
                        <div>
                            <label name="input1" className="inputLabel">{ethBalance} Ether</label>
                        </div>
                        <TextField loading
                            id="input1"
                            type="text"
                            className="formInput"
                            placeholder="0"
                            required 
                        />
                    </div>
                    <div>
                        <div>
                            <label name="input2">{tokenBalance} Tokens</label>
                        </div>
                        <TextField loading
                            id="input2"
                            type="text"
                            className="formInput"
                            placeholder="0"
                            required 
                        />
                    </div>
                    <div>
                        <Button className='ma-8' depressed>🔀</Button>
                    </div>
                    <div className="dark-mode__toggle">
                        <Switch
                            onClick={toggleDarkMode}
                            className={darkMode ? "toggle toggled" : "toggle"}
                        />
                </div>
            </form>
        </Card>
        </div>
        </>




    )
}

export default MainCard;

