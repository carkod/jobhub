/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import shortid from 'shortid';

class Sidebar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openmenu: false,
      active: false,
    }
  }
  
  componentDidMount = () => {
    axios.get('http://cv-generator-carkod.c9users.io:8081/api/cats')
      .then((res) => {
        const {data} = res;
        this.setState({data})
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  componentWillReceiveProps = (props) => {
  }
  
  render() {
    console.log(this.props)
    const {data} = this.state;
    let renderPositions, renderLanguages;
    if (data !== undefined) {
      //Positions
      const positionsIndex = data.findIndex(e => e.label === 'positions');
        renderPositions = parent => 
          <li className="item dropdown">
            <a href="#" className="" >{parent}</a>
            <ul>
          {data[positionsIndex].children.map((el, i) =>
            
              <li key={shortid.generate()} className="item" ><NavLink to={`/${parent}/en/${el.value}`} className="" activeClassName="active">{el.text}</NavLink></li>
            
          )}
            </ul>
          </li>
      
      //Languages    
      const languagesIndex = data.findIndex(e => e.label === 'languages');
        renderLanguages = data[languagesIndex].children.map((el, i) =>
          <NavLink key={shortid.generate()} to={`/${parent}/en/${el.value}`} className="item" activeClassName="active">{el.text}{console.log(el)}</NavLink>
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
          
          {renderPositions !== undefined ? renderPositions('cv') : ''}
          
          {renderPositions !== undefined ? renderPositions('resources') : ''}
          
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
