/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";


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
        
        <div className="quick-nav">
              <h2 className="short-version title">No time for browsing?</h2>
              <p className="short-version text">Download short version of my CV</p>
              <select id="quick-cv" className="ui dropdown" selected="Select Role">
                <option value="frontend">Front-end</option>
                <option value="project-manager">Project Manager</option>
                <option value="business">Business Analyst</option>
              </select>
            </div>
            <div className="explore">
              <h2 className="short-version title">Explore my background</h2>
              <p className="short-version text">Proceed to extended CV</p>
              <select id="quick-cv" className="ui dropdown" selected="Select Role">
                <option value="frontend">Front-end</option>
                <option value="project-manager">Project Manager</option>
                <option value="business">Business Analyst</option>
              </select>
            </div>
            
            <div className="home-details">
            <div className="ui list">
              
              <div className="item">
                <i className="id card icon"></i>
                <div className="content">
                  Carlos Wu 
                </div>
              </div>
              <div className="item">
                <i className="briefcase icon"></i>
                <div className="content">
                  Eventure Internet
                </div>
              </div>
              <div className="item">
                <i className="marker icon"></i>
                <div className="content">
                  Mansfield, Notts, UK
                </div>
              </div>
              <div className="item">
                <i className="mail icon"></i>
                <div className="content">
                  <a href="mailto:carkodesign@gmail.com">carkodesign@gmail.com</a>
                </div>
              </div>
              <div className="item">
                <i className="linkedin square icon"></i>
                <div className="content">
                  <a href="https://www.linkedin.com/in/carkod/" title="https://www.linkedin.com/in/carkod/">LinkedIn</a>
                </div>
              </div>
              <div className="item">
                <i className="github icon"></i>
                <div className="content">
                  <a href="http://github.com/carkod/jobhub" title="http://github.com/carkod/jobhub">Github</a>
                </div>
              </div>
              <div className="item">
                <i className="stack overflow icon"></i>
                <div className="content">
                  <a href="https://stackoverflow.com/users/2454059/carkod" title="https://stackoverflow.com/users/2454059/carkod">StackOverflow</a>
                </div>
              </div>
              
            </div>
          </div>
      </div>
    );
  }
}
