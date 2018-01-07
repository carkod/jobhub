/* eslint-disable */

import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class Layout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount = () => {
    
  }
  
  componentWillReceiveProps = (props) => {
    
  }
  
  render() {
    return (
      <footer className="footer">
          
          <div className="copyright">
            <p>This application was built with <a href="https://reactjs.org/" target="_blank">React.js</a> and pure CSS3.</p>
          </div>
        
      </footer>
    );
  }
}

export default Layout;
