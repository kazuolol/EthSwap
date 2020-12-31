pragma solidity ^0.5.0;

import './Token.sol';

contract EthSwap {
    //state variables
    string public name = "EthSwap!!";
    Token public token;
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        //calculate the number of tokens given according to amt of ETH sent
        uint tokenAmount = msg.value * rate; //their ETH * 100 = the amt of tokens they get
        //require EthSwap to have enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);
        //transfer coins to sender
        token.transfer(msg.sender, tokenAmount);
        // emit an event 
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
        
    }

    function sellTokens(uint _amount) public {
        //user can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);
        //calculate the amount of ether to give to seller
        uint etherAmount = _amount / rate;
        //require that ethSwap has enough ethereum to perform tx
        require(address(this).balance >= etherAmount);
        //perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);
        //emit event
        emit TokensSold(msg.sender, address(token), _amount, rate);
        
    
    }
}