/* eslint-disable */

import React, { Component } from 'react';

const MenuData = [
    {}    

]

export default class WelcomeNav extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openmenu: false,
      active: false
    }
  }
  
  
  
  render() {
    return (
      <div id="welcomeNav" className="container navigation">
        <div className="lefty">
          <div id="primary" className="ui secondary vertical pointing menu">
            <NavLink to="/" activeClassName="active" className="item" onClick={(e) => console.log(e)}>Home</NavLink>
            <NavLink to="/about" activeClassName="active" className="item" >About This</NavLink>
            <NavLink to="/contact" activeClassName="active" className="item" >Contact</NavLink>
            <NavLink to="/cv" activeClassName="active" className="item" >
            CV
                <div className="menu">
                    <a className="active item">Front-end Developer</a>
                    <a className="item">Project Manager</a>
                    <a className="item">Business Analyst</a>
                </div>
            </NavLink>
            <NavLink to="/cv" activeClassName="active" className="item" >Resources 
              <div className="menu">
                <a className="item">Projects</a>
                <a className="item">Cover Letters</a>
                <a className="item">References</a>
                <a className="item">Music Arrangements</a>
              </div></NavLink>
            <NavLink to="/cv" activeClassName="active" className="item" >Sitemap</NavLink>
            
          </div>
          
          <div id="secondary" className="ui secondarymenu">
            <a className="active item">
              <i className="united kingdom flag"></i>English (UK)
            </a>
            
          </div>
          
        </div>
        
        
        
        
          <div className="righty">
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
          
          <div className="copyright">
            <p>This application was built with <a href="https://reactjs.org/" target="_blank">React.js</a> and pure CSS3.</p>
          </div>
            
          </div>
          
            {/*<div className="cv-requests">
              <div className="ui tall stacked segment">
                <p>If you want to change the language, please change site language</p>
                </div>
                <div className="ui tall stacked segment hidden">
                  <p>If you need it in another file format, please contact me</p>
                </div>
            </div>*/}
            
          
      </div>
    );
  }
}
