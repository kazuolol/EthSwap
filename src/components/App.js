import React, { Component, useEffect, useState } from 'react';
import Web3 from 'web3';
import EthSwap from '../abis/EthSwap.json'
import Token from '../abis/Token.json'

import MainCard from './biggerPieces/MainCard'
import QrButton from './smallerPieces/QrButton'
import './App.css';
import 'ui-neumorphism/dist/index.css'
import Weth from '../WETH_03.gif'




class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    console.log('eth balance:', ethBalance)

    //load token
    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]

    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })

      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      console.log('token balance', this.state.tokenBalance.toString())


      console.log('token contract:', token)

      this.setState({ tokenBalance: tokenBalance.toString() })

    } else {
      window.alert('token contract not deployed to detected network')
    }

    //load ethswap 
    const ethSwapData = EthSwap.networks[networkId]


    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
    } else {
      window.alert('EthSwap contract not deployed to detected network')
    }
    console.log('EthSwap contract:', this.state.ethSwap)
    this.setState({ loading: false })
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
      token: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      loading: true,
    }
  }

  render() {


    let content

    if (this.state.loading) {
      content =
        <button className="btn btn-primary mr-4" type="button">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span className="sr-only">Loading...</span>
        </button>

    } else {
      content = <MainCard className="mainCard" account={this.state.account} ethBalance={this.state.ethBalance} tokenBalance={this.state.tokenBalance} />
    }

    return (
      <>
        <QrButton className="qrButton" account={this.state.account} />
        <div className="centered">

          {content}
        </div>

      </>


    );
  }
}

export default App;
