import React, { Component, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import tenor from '../tenor.gif'
import Identicon from 'identicon.js'


class NavBar extends Component {
    
    render() {
        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" account={''}>
              <img
                alt=""
                src={tenor}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              EthSwap 
              {}
            </Navbar.Brand>
            <p className="account">{
                this.props.account ?  
                <img 
                className="identicon"
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`    
                } 
                />
                : <span></span>}
                {this.props.account}
                </p>
            
          </Navbar>
          
        );
      }
    
}

export default NavBar;