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
      active: false
    }
  }
  
  componentDidMount = () => {
    console.log(this.props)
  }
  
  componentWillReceiveProps = (props) => {
    
  }
  
  render() {
    return (
      <div className="layout">
        <main id="main" className="container navigation">
          <div className="lefty">
            <Sidebar />
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
