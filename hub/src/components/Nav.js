/* eslint-disable */
import React, { Component } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import { Sidebar, Button, Header, Segment, Menu } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

class Nav extends Component {
  
  state = {
  }

  
  componentDidMount = () => {
  }
  
  
  render() {
     
     const style = {
         width:'200px',
         background: '#1b1c1d',
         position:'absolute',
         top:'0',
         left: '0',
         minHeight: '100%',
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
                    <NavLink to="/projects" activeClassName="current" >Projects</NavLink>    
                </div>
                <div className="item">
                    <NavLink to="/others" activeClassName="current" >Others</NavLink>
                </div>
                <div className="item">
                    <NavLink to="/jobs" activeClassName="current" >Job Board</NavLink>    
                </div>
            </div>
          </nav>
    );
  }
}

export default Nav;
