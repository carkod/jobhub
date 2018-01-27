/* eslint-disable */

import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Footer from './Footer';


class Layout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openmenu: false,
      active: false,
    }
  }
  
  componentDidMount = () => {
    
  }
  
  componentWillReceiveProps = (props) => {
    
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
