/* eslint-disable */

import React, { Component } from 'react';

export default class WelcomeNav extends Component {
  
  render() {
    return (
      <div id="welcomeNav" className="container navigation">
        <div className="ui secondary  menu">
          <div id="claim" className="left menu">
            <a href="#" className="item"><i className="united kingdom flag"></i>English (UK)</a>
          </div>
          <div className="right menu">
            <a className="active item">
              Home
            </a>
            <a href="#" className="item">
              About This
            </a>
            <a href="#" className="item">
              Contact
            </a>
            <a href="#" className="item">
              CV/Resume
            </a>
            <a href="#" className="item">
              Resources
            </a>
            <a href="#" className="item">
              Sitemap
            </a>
          </div>
        </div>
          <div className="bottom-wrap">
            <div className="quick-nav">
              <h2 className="short-version title">No time for browsing?</h2>
              <p className="short-version text">Download short version of my CV</p>
              <select id="quick-cv" class="ui dropdown" selected="Select Role">
                <option value="frontend">Front-end</option>
                <option value="project-manager">Project Manager</option>
                <option value="business">Business Analyst</option>
              </select>
            </div>
            <hr />
            <div className="explore">
              <h2 className="short-version title">Explore my background</h2>
              <p className="short-version text">Proceed to extended CV</p>
              <select id="quick-cv" class="ui dropdown" selected="Select Role">
                <option value="frontend">Front-end</option>
                <option value="project-manager">Project Manager</option>
                <option value="business">Business Analyst</option>
              </select>
            </div>
          </div>
          
          <div className="home-details">
            <div class="ui list">
              
              <div class="item">
                <i class="id card icon"></i>
                <div class="content">
                  Carlos Wu 
                </div>
              </div>
              <div class="item">
                <i class="briefcase icon"></i>
                <div class="content">
                  Eventure Internet
                </div>
              </div>
              <div class="item">
                <i class="marker icon"></i>
                <div class="content">
                  Mansfield, Notts, UK
                </div>
              </div>
              <div class="item">
                <i class="mail icon"></i>
                <div class="content">
                  <a href="mailto:carkodesign@gmail.com">carkodesign@gmail.com</a>
                </div>
              </div>
              <div class="item">
                <i class="linkedin square icon"></i>
                <div class="content">
                  <a href="https://www.linkedin.com/in/carkod/" title="https://www.linkedin.com/in/carkod/">LinkedIn</a>
                </div>
              </div>
              <div class="item">
                <i class="github icon"></i>
                <div class="content">
                  <a href="http://github.com/carkod/jobhub" title="http://github.com/carkod/jobhub">Github</a>
                </div>
              </div>
              <div class="item">
                <i class="stack overflow icon"></i>
                <div class="content">
                  <a href="https://stackoverflow.com/users/2454059/carkod" title="https://stackoverflow.com/users/2454059/carkod">StackOverflow</a>
                </div>
              </div>
              
            </div>
          </div>
          
            <div className="cv-requests">
              <div className="ui tall stacked segment">
                <p>If you want to change the language, please change site language</p>
                </div>
                <div className="ui tall stacked segment hidden">
                  <p>If you need it in another file format, please contact me</p>
                </div>
            </div>
            
          <div className="copyright">
            <p>This application was built with <a href="https://reactjs.org/" target="_blank">React.js</a> and pure CSS3.</p>
          </div>
      </div>
    );
  }
}
