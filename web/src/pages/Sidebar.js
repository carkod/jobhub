import produce from 'immer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCats } from '../actions/cats';
import { fetchCVNav, fetchCVs } from '../actions/cv';
import { fetchProjects } from '../actions/res';
import { getCvsReducer } from '../reducers/cv';

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
  
  componentDidMount = async () => {
    try {
      const navigationCvs = await fetchCVNav();
      this.setState(produce(draft => {
        draft.cvs = navigationCvs
      }));
    } catch (e) {
      if (e) throw e;
    }
    try {
      const projects = await fetchProjects();
      const filterProjects = projects.filter(x => x.cats.locale === 'en-GB' && x.cats.status === 'public')
      const projectsMenu = filterProjects.filter((el, i, self) => {
        return i === self.findIndex(j => {
          return el.cats.position === j.cats.position
        })
      })
      this.setState(produce(draft => {
        draft.projects = projectsMenu
      }));
    } catch (e) {
      if (e) throw e;
    }
    
    
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
              {this.state.cvs.map(cv => 
                <li key={cv._id} className="item" >
                  <NavLink to={`/cv/${cv.cats.locale}/${cv._id}`} activeClassName="active">
                    {cv.navName}
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
              {this.state.projects.map(p => 
                <li key={p._id} className="item" >
                  <NavLink to={`/portfolio/${p.cats.locale}/${p.cats.position}`} activeClassName="active">
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

export default Sidebar;
