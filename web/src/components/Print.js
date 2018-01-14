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
    
  }
  
  componentWillReceiveProps = (props) => {
    
  }
  
  render() {
    
    return (
      <div>
        <main id="print">
          <div className="righty">
            {this.props.children}  
          </div>
            
        </main>
        
      </div>
    );
  }
}

export default Layout;
