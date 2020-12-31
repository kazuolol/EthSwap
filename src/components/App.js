import React, { Component, useEffect, useState } from 'react';
import logo from '../logo.png';
import anime from '../anime.gif'
import Web3 from 'web3';
import './App.css';
import Navbar from './navBar'
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
    console.log(this.state.account);
    const balance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance: balance })
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
