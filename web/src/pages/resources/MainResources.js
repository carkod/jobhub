/* eslint-disable */

import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import shortid from 'shortid';
import { fetchCats } from '../../actions/cats';
import { fetchProjects } from '../../actions/res';
import HtmlText from '../../components/HtmlText';
import Documents from './Documents';
import Links from './Links';
import Metatags from "../../components/Metatags";

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
  
  componentDidUpdate = (props) => {
    if (this.props.portfolio !== props.portfolio) {
      const {portfolio} = props;
      this.setState({portfolio: portfolio});
    }
  }
  
  render() {
    const {portfolio} = !!Object.keys(this.state).length ? this.state : this.props;
    const {position} = this.props.match.params;
    const {positions} = this.props;
    const matchPos = pos => {
      if (positions) {
        return positions.find(i => i.value === pos)
      } else {
        return false;
      }
    }
    const title = positions ? matchPos(position).text : 'Professional Profile';
    
    return (
      <div id="mainportfolio" className="container">
        <Metatags
          title={`${title} | Portfolio`}
          description={`Portfolio and projects by Carlos Wu - ${title}`}
        />
        
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
                  </div>
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
  const {position, language} = props.match.params;
  let cats = state.cats.data, urlCategory = [], positions;
  
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
    }
  }
  
}


export default connect(mapStateToProps, { fetchProjects, fetchCats })(MainResources);