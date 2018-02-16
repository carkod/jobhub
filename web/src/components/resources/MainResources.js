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
<<<<<<< HEAD
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
                  
=======
    const {position} = this.props.match.params;
    const {positions} = this.props;
    console.log(positions)
    const matchPos = pos => {
      if (positions) {
        return positions.find(i => i.value === pos)
      } else {
        return false;
      }
    }
    console.log('match Pos method', matchPos(position))
    const title = positions ? matchPos(position).text : 'Professional Profile';
    
    return (
      <div id="mainportfolio" className="container">
        <Helmet>
          <title>{`Carlos Wu - ${title}`}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={`Portfolio and projects by Carlos Wu - ${title}`}/>
          <link rel="canonical" href={`http://carloswu.xyz/en-GB/${position}/resources`} />
        </Helmet>
        
        <main className="portfolioContent ui grid">
        <h1>{`You are viewing ${title} projects`}</h1>
          {portfolio.map((project, i) =>
          <div key={project.id || shortid.generate()} className="row one column wide">
            <section id="project" className="column ui grid">
              <h2>{project.name}</h2>
                <div className="row two column wide">
                  <div className="left column" style={{backgroundImage: project.imgURL}}>
                    <HtmlText text={project.desc} />
                  </div>
                  <div className="right column">
                    <div className="description">
                      <Links links={project.links}/>
                    </div>
                    <div className="description">
                      <Documents documents={project.documents}/>
                    </div>
>>>>>>> new history fix corrupted git
                </div>
              </div>
            </section>
            <section id="material" className="column ui grid">
              <div className="row two column wide">
<<<<<<< HEAD
                <Links links={project.links}/>
                <Documents documents={project.documents}/>
=======
                
>>>>>>> new history fix corrupted git
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
<<<<<<< HEAD
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
=======
  const {position, language} = props.match.params;
  let cats = state.cats.data, urlCategory = [], positions;
  
  console.log(state)
  if (portfolio[0]._id !== '' && cats) {
    positions = cats.find(it => it.label === 'positions').children;
    
    urlCategory = portfolio.filter(cv => {
      const matchPos = cv.cats.position.toLowerCase() === position;
      const matchStatus = cv.cats.status !== undefined ? cv.cats.status.toLowerCase() === 'public' : false;
      const matchLang = cv.cats.locale === language;
      return matchPos && matchStatus && matchLang;
    })
  
    return {
      portfolio: urlCategory,
      positions: positions
    }
  } else {
    return {
      portfolio: portfolio,
      positions: null
>>>>>>> new history fix corrupted git
    }
  }
  
}


export default connect(mapStateToProps, { fetchProjects, fetchCats })(MainResources);