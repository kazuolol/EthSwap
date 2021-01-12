import React, { useState, useRef } from 'react';
import { Button, Card, Switch, TextField, overrideThemeVariables } from 'ui-neumorphism'
import computer from '../../computer2.gif'
import ether from '../../ethIcon.png'
import altcoin from '../../altcone.png'
import 'ui-neumorphism/dist/index.css'

import { useDarkMode } from '../../hooks/useDarkMode'


const MainCard = ({ account, ethBalance, tokenBalance }) => {

    // Dark mode

    const [darkMode, setDarkMode] = useDarkMode(true)

    const [output, setOutput] = useState('')

    const ethInput = useRef(0)

    const toggleDarkMode = (e) => {
        e.preventDefault();
        document.body.classList.toggle("dark-mode");
        setDarkMode(!darkMode);
    };

    let content;



    const sunAndMoon = {
        sun: '☀️',
        moon: '🌙'
    }

    darkMode ? content = sunAndMoon.sun : content = sunAndMoon.moon


    const date = new Date().toString()

    return (


        <>

            <div className="toggleWrapper">

            </div>
            <div className="right">


                <img onClick={toggleDarkMode} className="computer" src={computer} />

            </div>
            <span className="sunOrMoon" onClick={toggleDarkMode}>{content}</span>
            <div className="centered">

                <Card loading className="ui-card" width={400} height={400}>

                    <h1>EthSwap</h1>

                    <h6>Welcome, {account} </h6>
                    <form className="form">

                        <div>
                            <div>
                                <label name="input1" className="inputLabel">{window.web3.utils.fromWei(ethBalance)} ETH </label> <img src={ether} height='28' />
                                
                            </div>

                            <TextField
                                id="input1"
                                type="text"
                                onChange={(event => {
                                    console.log("changing")
                                    const etherAmount = event.value
                                    setOutput(etherAmount * 100)
                                    console.log(output)
                                })}


                                className="formInput"
                                placeholder="0"
                                required
                            />
                        </div>
                        <div>
                            <div>

                                <label>{window.web3.utils.fromWei(tokenBalance)} MEM </label> <img src={altcoin} height='28' />

                            </div>
                            <TextField

                                type="text"
                                className="formInput"
                                placeholder={output.toString()}
                                value={output.toString()}
                                disabled
                                
                            /> 
                            
                        </div>
                        
                        <div>
                            <Button className='ma-8' depressed>🔀</Button>
                            <div>Exchange rate: 1 ETH = 100 MEM</div>
                        </div>
                    </form>
                    
                </Card>
            </div>
        </>




    )
}

export default MainCard;

