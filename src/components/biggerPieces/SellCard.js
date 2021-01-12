import React, { useState, useRef } from 'react';
import { Button, Card, TextField, } from 'ui-neumorphism'
import computer from '../../computer.gif'
import ether from '../../ethIcon.png'
import altcoin from '../../altcone.png'
import 'ui-neumorphism/dist/index.css'
import { useDarkMode } from '../../hooks/useDarkMode'

const SellCard = ({ account, ethBalance, tokenBalance, sellTokens }) => {


    const [darkMode, setDarkMode] = useDarkMode(true)

    const [output, setOutput] = useState(ethBalance && tokenBalance  && account ? '' : null)

    

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

    return (
        <>

      
        <div className="right">

        </div>
        <span className="sunOrMoon2" onClick={toggleDarkMode}>{content}</span>
        <div className="centered">

            <Card loading className="ui-card" width={400} height={400}>

                <h1>EthSell</h1>

                <h6>Welcome, {account} </h6>
                <form className="form" onSubmit={(event) => {
                    
                    let etherAmount
                    etherAmount = output.toString()
                    etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
                    console.log('ether amount:', etherAmount)
                    sellTokens(etherAmount)
                }}>

                    <div>
                        <div>
                            <label name="input1" className="inputLabel">{window.web3.utils.fromWei(tokenBalance)} MEM </label> <img src={altcoin} height='28' />

                        </div>

                        <TextField
                            id="input1"
                            type="text"
                            onChange={(event => {
                                console.log("changing")
                                const tokenAmount = event.value
                                setOutput(tokenAmount / 100)
                                console.log(output)
                            })}


                            className="formInput"
                            placeholder="0"
                            required
                        />
                    </div>
                    <div>
                        <div>

                            <label>{window.web3.utils.fromWei(ethBalance)} MEM </label> <img src={ether} height='28' />

                        </div>
                        <TextField

                            type="text"
                            className="formInput"
                            placeholder={output.toString()}
                            disabled

                        />

                    </div>

                    <div>
                        <Button className='ma-8' depressed>🔀</Button>
                        <div>Exchange rate: 100 MEM = 1 ETH</div>
                    </div>
                </form>

            </Card>
        </div>
    </>
    )
}

export default SellCard;
