import React, { Component, useEffect, useState } from 'react';
import Web3 from 'web3';
import EthSwap from '../abis/EthSwap.json'
import Token from '../abis/Token.json'
import './App.css';
import 'ui-neumorphism/dist/index.css'
import MainCard from './biggerPieces/MainCard'
import QrButton from './smallerPieces/QrButton'
import { ProgressBar } from '@react95/core'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] })

    const balance = await web3.eth.getBalance(this.state.account)
    this.setState({ balance })
    console.log(balance)

    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      console.log(token)
    } else {
      window.alert('token contract not deployed to detected network')
    }

    
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non ethereum browser detected, try installing metamask or some other provider.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      ethBalance: 0
    }
  }

  render() {
    return (
      <>

        <QrButton className="qrButton" account={this.state.account} />
        <div className="centered">
          <MainCard className="mainCard" account={this.state.account} />
        </div>

      </>


    );
  }
}

export default App;
