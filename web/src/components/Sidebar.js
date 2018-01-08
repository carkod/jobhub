/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import shortid from 'shortid';
import {fetchCats} from '../actions/cats';

class Sidebar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openmenu: false,
      active: false,
    }
  }
  
  componentDidMount = () => {
    fetchCats().then((res) => {
        const {data} = res;
        this.setState({data})
      })
  }
  
  componentWillReceiveProps = (props) => {
    //console.log(props)
  }
  
  toggleMenu = (parent) => (e) => {
    e.preventDefault();
    const lastParent = parent;
    if (this.state.openmenu === lastParent ) {
      this.setState({openmenu: ''})
    } else {
      this.setState({openmenu: parent})  
    }
  }
  
  render() {
    const {data} = this.state;
    let renderPositions, renderLanguages;
    if (data !== undefined) {
      //Positions
      const positionsIndex = data.findIndex(e => e.label === 'positions');
        renderPositions = data[positionsIndex].children.map((el, i) =>
          <li key={shortid.generate()} className="item" ><NavLink to={`/${parent}/en/${el.value}`} className="" activeClassName="active">{el.text}</NavLink></li>
          )
      
      //Languages    
      const languagesIndex = data.findIndex(e => e.label === 'languages');
        renderLanguages = data[languagesIndex].children.map((el, i) =>
          <NavLink key={shortid.generate()} to={`/${parent}/en/${el.value}`} className="item" activeClassName="active">{el.text}}</NavLink>
        )
    }
    return (
    <nav id="nav" role="navigation">
      <div id="primary" className="ui link list">
        <ul>
          <li className="item">
            <a href="/" className="">Home</a>
          </li>
          <li className="item">
            <NavLink to="/about" activeClassName="active" className="" >About</NavLink>
          </li>
          <li className="item dropdown">
            <a href="#" className="" onClick={this.toggleMenu('cv')} >CV</a>
            <ul id="cv" className={this.state.openmenu === 'cv' ? 'openMenu' : 'closeMenu' }>
              {renderPositions !== undefined ? renderPositions : ''}
            </ul>
          </li>
          <li className="item dropdown">
            <a href="#" className="" onClick={this.toggleMenu('resources')}>Resources</a>
            <ul id="resources" className={this.state.openmenu === 'resources' ? 'openMenu' : 'closeMenu' }>
              {renderPositions !== undefined ? renderPositions : ''}
            </ul>
          </li>
          
          <li className="item" >
            <NavLink to="/sitemap" activeClassName="active" >Sitemap</NavLink>
          </li>
        </ul>
            
      </div>
          
      <div id="secondary" className="ui secondarymenu">
      {renderLanguages !== undefined ? renderLanguages : ''}
        <a className="item">
          <i className="united kingdom flag"></i>English (UK)
        </a>
        
      </div>
    </nav>
    );
  }
}

export default Sidebar;
