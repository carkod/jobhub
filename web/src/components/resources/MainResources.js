/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import {stateToHTML} from 'draft-js-export-html';
import shortid from 'shortid';
import { fetchProjects } from '../../actions/res';
import { fetchCats } from '../../actions/cats';
import HtmlText from './HtmlText';
import Links from './Links';
import Documents from './Documents';

class MainResources extends Component {
    
    constructor(props) {
    super(props);
    const {portfolio} = this.props;
    
    this.state = {
      portfolio: portfolio,
    };
    
  }

  componentDidMount = () => {
    this.props.fetchProjects();
    this.props.fetchCats();
  }
  
  componentWillReceiveProps = (props) => {
    const {portfolio} = props;
    this.setState({portfolio: portfolio});
  }
  
  render() {
    const {portfolio} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div id="mainportfolio" className="container">
        <Helmet>
          <title>{`Carlos Wu - ${portfolio.name}`}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={`Carlos Wu - Professional Profile | ${portfolio.name}`}/>
          <link rel="canonical" href="http://carloswu.xyz/" />
        </Helmet>
        
        <main className="portfolioContent ui grid">
          {portfolio.map((project, i) =>
          <div key={project.id || shortid.generate()} className="row one column wide">
            <section id="project" className="column ui grid">
              <h1>{project.cats.position} - <small>{project.name}</small></h1>
                <div className="row two column wide">
                  <div className="left column">
                    <img src={project.imgURL} className="preview" alt="Image"/>
                  </div>
                  <div className="right column">
                    <div className="description">
                      <HtmlText text={project.desc} />
                    </div>
                  
                </div>
              </div>
            </section>
            <section id="material" className="column ui grid">
              <div className="row two column wide">
                <Links links={project.links}/>
                <Documents documents={project.documents}/>
              </div>
            </section>            
          </div>
          )}
        </main>
        
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  const {portfolio} = state;
  const {position} = props.match.params;
  let cats = state.cats.data;
  let urlCategory = [];
  
  if (portfolio[0]._id !== '' && cats) {
    cats = cats.find(it => it.label === 'positions').children;
    urlCategory = portfolio.filter(cv => {
      return cv.cats.position.toLowerCase() === position
    })
    
  
    return {
      portfolio: urlCategory,
    }
  } else {
    return {
      portfolio: portfolio
    }
  }
  
}


export default connect(mapStateToProps, { fetchProjects, fetchCats })(MainResources);