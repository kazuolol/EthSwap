import React, { useState, useRef } from 'react';
import BuyCard from './BuyCard'
import SellCard from './SellCard'
import computer from '../../computer.gif'
import computer2 from '../../computer2.gif'



const MainCard = ({ account, ethBalance, tokenBalance, buyTokens, sellTokens }) => {

    const [form, changeForm] = useState(true)
    
    let content;

    let comp1 = <img src={computer} alt="sell" onClick={(event) => {
        changeForm(false)}} className="computer" />

    let comp2 = <img src={computer2} alt="buy" onClick={(event) => {
        changeForm(true)}} className="computer" />
    

    if (form === true) {
        content = <BuyCard account={account} ethBalance={ethBalance} 
        tokenBalance={tokenBalance} 
        buyTokens={buyTokens}
        /> 
    } else {
        content = <SellCard account={account} 
        ethBalance={ethBalance} 
        tokenBalance={tokenBalance}  
        sellTokens={sellTokens}
        />
        
    }

    return (
        
        <>
        
        {content}
       
        {form ? comp1 : comp2}
        <span className="buyOrSell" onClick={(event) => {
            changeForm(!form)
        }}>{form === true ? 'click pc to sell :-<' : 'click pc to buy :->'}</span>

       </>

    )
}

export default MainCard;

