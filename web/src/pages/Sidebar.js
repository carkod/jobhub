/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import shortid from 'shortid';
import {fetchCats} from '../actions/cats';
import { fetchCVs } from '../actions/cv';
import { fetchProjects } from '../actions/res';

class Sidebar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openmenu: false,
      active: false,
      cats: [],
      cvs: [],
      projects: []
    }
  }
  
  componentDidMount = () => {
    this.props.fetchCats();
    this.props.fetchCVs()
    this.props.fetchProjects();
    
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
    const {cats, cvs, projects, projectCats} = this.props;
    let renderPositions, renderLanguages, renderResources, matchCatsCVs, matchProjectCVs;
    if (cats !== undefined) {
      //Positions
      
      
      // const positionsIndex = cats.findIndex(e => e.label === 'positions');
      const posIx = cats.findIndex(e => e.label === 'positions');
      if (cvs) {
        matchCatsCVs = cats[posIx].children.filter(i => {
          for (let cv of cvs) {
            if (cv.cats.position === i.value && cv.cats.status === 'public')
            return true;
          }
                   
        })
      } else {
        matchCatsCVs = cats[posIx].children;
      }
        renderPositions = parent => matchCatsCVs.map((el, i) =>
          <li key={shortid.generate()} className="item" ><NavLink to={`/en-GB/${el.value}/${parent}`} className="" activeClassName="active">{el.text}</NavLink></li>
          )
      
      //Resources
      if (cvs) {
        matchProjectCVs = cats[posIx].children.filter(i => {
          for (let cv of projects) {
            if (cv.cats.position.toLowerCase() === i.value && cv.cats.status === 'public')
            return true;
          }
                   
        })
      } else {
        matchProjectCVs = cats[posIx].children;
      }
       renderResources = parent => matchProjectCVs.map((el, i) =>
          <li key={shortid.generate()} className="item" ><NavLink to={`/en-GB/${el.value}/${parent}`} className="" activeClassName="active">{el.text}</NavLink></li>
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
          <li className="item dropdown">
            <button className="btn" onClick={this.toggleMenu('cv')} >CV</button>
            <ul id="cv" className={this.state.openmenu === 'cv' ? 'openMenu' : 'closeMenu'}>
              {cvs.map(cv => 
                <li key={cv._id} className="item" >
                  <NavLink to={`/cv/${cv.cats.locale}/${cv._id}`} activeClassName="active">
                    {cv.name}
                  </NavLink>
                </li>
              )}
            </ul>
          </li>
          <li className="item dropdown">
            <button className="btn" onClick={this.toggleMenu('faqs')} >FAQs</button>
            <ul id="faqs" className={this.state.openmenu === 'faqs' ? 'openMenu' : 'closeMenu'}>
              <li className="item" >
                <NavLink to={`/about/me`} activeClassName="active">
                  About me
                </NavLink>
              </li>
              <li className="item" >
                <NavLink to={`/about/site`} activeClassName="active">
                  About site
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="item dropdown">
            <button className="btn" onClick={this.toggleMenu('portfolio')} >Portfolio</button>
            <ul id="portfolio" className={this.state.openmenu === 'portfolio' ? 'openMenu' : 'closeMenu' }>
              {projectCats.map(p => 
                <li key={p._id} className="item" >
                  <NavLink to={`/portfolio/${p.cats.locale}/${p.cats.position}/${p._id}`} activeClassName="active">
                    {p.cats.position}
                  </NavLink>
                </li>
              )}
            </ul>
          </li>
        </ul>
            
      </div>
    </nav>
    );
  }
}

const mapStateToProps = (s,p) => {
  const { cats, cvs, portfolio } = s
  const filterCVs = cvs.filter(x => x.cats.locale === 'en-GB' && x.cats.status === 'public')
  const filterProjects = portfolio.filter(x => x.cats.locale === 'en-GB' && x.cats.status === 'public')
  const projectsMenu = filterProjects.filter((el, i, self) => {
    return i === self.findIndex(j => {
      return el.cats.position === j.cats.position
    })
  })
  if (s !== p) {
    return {
      cats: s.cats.data,
      cvs: filterCVs,
      projects: filterProjects,
      projectCats: projectsMenu
    }  
  }
  
  
}

export default connect(mapStateToProps, { fetchCVs, fetchCats, fetchProjects })(Sidebar);
