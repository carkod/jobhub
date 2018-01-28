/* eslint-disable */

import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Footer from './Footer';
import CSSTransition from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `transform 200ms ease-in-out`,
  transform: 'translateX(-100%)',
  backgroundColor: 'blue',
}

const transitionStyles = {
  entering: { transform: 'translateX(-10%)' },
  entered: { transform: 'translateX(0%)' },
};

class Layout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openmenu: false,
      active: false,
    }
  }
  
  render() {
    
    return (
      <div className="layout">
        <main id="main" className="container">
          <button id="burger" className="mobile only" onClick={() => this.setState({navigation: !this.state.navigation})} ><i className="cube icon" /></button>
          <div className={this.state.navigation ? "lefty open" : "lefty close"}>
            <Sidebar {...this.props} />
          </div>
          
          <div className="righty">
            {this.props.children}  
            <Footer />
          </div>
            
        </main>
        
      </div>
    );
  }
}

export default Layout;
