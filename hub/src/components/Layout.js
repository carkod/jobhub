/* eslint-disable */

import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Sidebar, Button, Header, Segment, Menu } from 'semantic-ui-react';
import Nav from './Nav';
import Notifications from './Notification';
import 'semantic-ui-css/semantic.min.css';

class Layout extends Component {
  
  state = {
    navVisible: true,
  }
  
  navVisibility = () => {
    this.setState({ navVisible: !this.state.navVisible })
  }
  
  render() {
   
   var transformPadding = this.state.navVisible ? '240px' : '40px';
   
    var style = {
      transform: this.state.navVisible ? 'translate3d(15rem, 0, 0)' : 'translate3d(0, 0, 0)',
      position: 'absolute',
      top: '0',
      left:'0',
      minHeight: '100%',
      width:'100%',
      zIndex: '1',
      Webkittransition: 'transform 0.5s ease', /* Safari */
      transition: 'transform 0.5s ease',
      background:'#fff',
      padding: '20px ' + transformPadding + ' 20px 40px',
      maxWidth:'100%',
    }
    
    var dimmer = {
      background: 'rgb(204,204,204, 0.5)',
    }
    
    return (
      <div className="layout">
        <Nav />
        <div className={'pusher ' + (this.state.navVisible ? 'navVisible' : '')} style={style}>
        <div className="dimmer" />
        
          <i className={'icon toggle large ' + (this.state.navVisible ? 'on inverted green' : 'off')} onClick={this.navVisibility} />
          {this.props.children}
        </div>
        <Notifications {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (s,p) => {
  const newObj = Object.assign({}, p, s)
  return newObj
}

export default Layout;
