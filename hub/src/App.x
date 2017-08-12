/* eslint-disable */

import React, { Component } from 'react';
import { Link, Route, IndexRoute, Router } from 'react-router-dom';


import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCVs, saveCV } from './actions';

import Layout from './components/Layout';
import Home from './components/Home';
import List from './components/List';
import Detail from './components/Detail';
import Sidenav from './components/Sidenav';

class App extends Component {
  
  state = {
    name: this.props.name ?  this.props.name : null,  
    
  }

  
  componentDidMount = () => {
    
  }
  
  
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default App;
