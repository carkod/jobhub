/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";

import WelcomeNav from './WelcomeNav';

export default class Home extends Component {
  
  render() {
    return (
      <div id="home" className="container">
        <Helmet>
          <title>Carlos Wu - Professional Profile</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Web developer, Business analyst, Project Manager"/>
          <link rel="canonical" href="http://carloswu.xyz/" />
        </Helmet>
        
        <WelcomeNav />
      </div>
    );
  }
}
