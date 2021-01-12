import React, { useState, useRef } from 'react';
import { Button, Card, TextField, } from 'ui-neumorphism'
import computer from '../../computer2.gif'
import ether from '../../ethIcon.png'
import altcoin from '../../altcone.png'
import 'ui-neumorphism/dist/index.css'
import { useDarkMode } from '../../hooks/useDarkMode'

const BuyCard = ({ account, ethBalance, tokenBalance, buyTokens }) => {

    // Dark mode
   

    const [darkMode, setDarkMode] = useDarkMode(true)

    const [output, setOutput] = useState(ethBalance && tokenBalance && buyTokens && account ? '' : null)

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


           

        </div>
        <span className="sunOrMoon" onClick={toggleDarkMode}>{content}</span>
        <div className="centered">

            <Card loading className="ui-card" width={400} height={400}>

                <h1>EthSwap</h1>

                <h6>Welcome, {account} </h6>
                <form className="form" onSubmit={(event) => {
                    
                    let etherAmount
                    etherAmount = output.toString()
                    etherAmount = window.web3.utils.toWei(etherAmount, 'ether')
                    console.log(etherAmount)
                    buyTokens(etherAmount / 100)
                }}>

                    <div>
                        <div>
                            <label name="input1" className="inputLabel">{window.web3.utils.fromWei(ethBalance)} ETH </label> <img src={ether} height='28' />

                        </div>

                        <TextField
                            id="input1"
                            type="text"
                            onChange={(event => {
                                console.log("changing")
                                const ethAmount = event.value
                                setOutput(ethAmount * 100)
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

export default BuyCard;
