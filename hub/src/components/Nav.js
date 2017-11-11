/* eslint-disable */
import React, { Component } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import { Sidebar, Button, Header, Segment, Menu } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

class Nav extends Component {
  
  state = {
  }


  render() {
     
    const style = {
        background: '#1b1c1d',
        position:'fixed',
        top:'0',
        left: '0',
        minHeight: '100%',
        overflowY: 'scroll',
    }
      
        return (
          <nav className="sidenav" style={style}>
            <div className="ui inverted vertical pointed menu">
                <div className="item">
                    <NavLink to="/" activeClassName="current" >Home</NavLink>
                </div>
                <div className="item">
                    <NavLink to="/cv" activeClassName="current" >CV</NavLink>
                    <div className="level-2 menu">
                        <div className="item">
                            <NavLink to="/cv/positions" activeClassName="current" >Positions</NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/cv/languages" activeClassName="current" >Languages</NavLink>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <NavLink to="/portfolio" activeClassName="current" >Portfolio</NavLink>    
                </div>
                <div className="item">
                    <NavLink to="/others" activeClassName="current" >Others</NavLink>
                </div>
                <div className="item">
                    <NavLink to="/jobs" activeClassName="current" >Job Board</NavLink>    
                    <div className="level-2 menu">
                        <div className="item">
                            <NavLink to="/jobs/linkedin" activeClassName="current" >LinkedIn</NavLink>
                        </div>
                        <div className="item">
                            <NavLink to="/jobs/jobbio" activeClassName="current" >Jobbio</NavLink>
                        </div>
                    </div>
                </div>
            </div>
          </nav>
    );
  }
}

export default Nav;
