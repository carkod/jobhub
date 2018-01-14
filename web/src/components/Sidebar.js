/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import shortid from 'shortid';
import {fetchCats} from '../actions/cats';
import { fetchCVs } from '../actions/cv';


class Sidebar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openmenu: false,
      active: false,
    }
  }
  
  componentDidMount = () => {
    this.props.fetchCats();
    this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (props) => {
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
    console.log(this.props)
    const {cats} = this.props;
    let renderPositions, renderLanguages;
    if (cats !== undefined) {
      //Positions
      const positionsIndex = cats.findIndex(e => e.label === 'positions');
      // No cv what happens? - When creating categories
        renderPositions = parent => cats[positionsIndex].children.map((el, i) =>
          <li key={shortid.generate()} className="item" ><NavLink to={`/en_GB/${el.value}/${parent}`} className="" activeClassName="active">{el.text}</NavLink></li>
          )
      
      //Languages    
      const languagesIndex = cats.findIndex(e => e.label === 'locales');
      
        renderLanguages = cats[languagesIndex].children.map((el, i) =>
      
      <li key={shortid.generate()} className="item" ><NavLink to={`${el.value}`} activeClassName="active">{el.text}</NavLink></li>

        )
    }
    
    
    return (
    <nav id="nav" role="navigation">
      <div id="primary" className="ui link list">
        <ul>
          <li className="item">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
          </li>
          <li className="item">
            <NavLink exact to="/about" activeClassName="active" className="" >About</NavLink>
          </li>
          <li className="item dropdown">
            <a href="#" className="" onClick={this.toggleMenu('cv')} >CV</a>
            <ul id="cv" className={this.state.openmenu === 'cv' ? 'openMenu' : 'closeMenu'}>
              {renderPositions !== undefined ? renderPositions('cv') : ''}
            </ul>
          </li>
          <li className="item dropdown">
            <a href="#" className="" onClick={this.toggleMenu('resources')}>Resources</a>
            <ul id="resources" className={this.state.openmenu === 'resources' ? 'openMenu' : 'closeMenu' }>
              {renderPositions !== undefined ? renderPositions('resources') : ''}
            </ul>
          </li>
          <li className="item dropdown">
            <a href="#" className="" onClick={this.toggleMenu('cl')} >Cover Letters</a>
            <ul id="cl" className={this.state.openmenu === 'cl' ? 'openMenu' : 'closeMenu' }>
              {renderPositions !== undefined ? renderPositions('cl') : ''}
            </ul>
          </li>
          <li className="item dropdown">
            <a href="#" className="" onClick={this.toggleMenu('lang')} >Site and CV language</a>
            <ul id="lang" className={this.state.openmenu === 'lang' ? 'openMenu' : 'closeMenu' }>
              {renderLanguages !== undefined ? renderLanguages : ''}
            </ul>
          </li>
        </ul>
            
      </div>
    </nav>
    );
  }
}

const mapStateToProps = (s,p) => {
  // Receive list of CVs
    // Check if there is a CV with status public
    // Check if this CV matches the Position
  // If all positive show CV
  // if one of them fails tell sidebar not to show this position on the sidebar
  
  
  if (s.cats.data !== undefined) {
    return {
      cats: s.cats.data,
      cvs: s.cvs
    }  
  } else {
    return {}
  }
  
}

export default connect(mapStateToProps, { fetchCVs, fetchCats })(Sidebar);
