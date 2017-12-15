/* eslint-disable */

import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class Layout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  componentDidMount = () => {
    
  }
  
  componentWillReceiveProps = (props) => {
    
  }
  
  render() {
    return (
      <div className="layout">
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
