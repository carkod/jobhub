/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import {stateToHTML} from 'draft-js-export-html';
import { fetchProjects } from '../../actions/res';
import { fetchCats } from '../../actions/cats';
import HtmlText from './HtmlText';

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
    console.log(props)
    const {portfolio} = props;
    this.setState({portfolio: portfolio});
  }
  
  render() {
    const {portfolio} = !!Object.keys(this.state).length ? this.state : this.props;
    console.log(portfolio)
    return (
      <div id="mainportfolio" className="container">
        <Helmet>
          <title>{`Carlos Wu - ${portfolio.name}`}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={`Carlos Wu - Professional Profile | ${portfolio.name}`}/>
          <link rel="canonical" href="http://carloswu.xyz/" />
        </Helmet>
        
        <main className="portfolioContent ui grid">
          <h1>{portfolio.cats.position} - <small>{portfolio.name}</small></h1>
          {portfolio.map((project, i) => (
            <section id="project" className="row two column wide">
            <div className="left two column">
              <img src={portfolio.imgURL} className="preview" alt="Image"/>
            </div>
            <div className="right two column">
              <div className="description">
                <HtmlText text={portfolio.desc} />
              </div>
              
            </div>
            
          </section>
          <section id="material" className="row two column wide">
              <div className="two column">
                {portfolio.links.length > 0 ? <div className="links ui top left label">Links</div> : ''}                
                  <div className="ui divided selection list">
                {portfolio.links.map((link, i) =>
                    <div className="item" key={link.id}>
                      <div className="name">
                        <a href={link.url} className="url">{link.title}<i className="icon"></i></a>
                      </div>
                      
                    </div>
                  )}
                </div>          
              </div>
            
              <div className="two column">
              {portfolio.documents.length > 0 ? <div className="files ui top right label">Files</div> : '' }
                  <div className="ui divided selection list">
                  {portfolio.documents.map((doc, i) =>
                    <div className="item" key={doc.fileId}>
                      <div className="name">
                        <a href={doc.fileURL} className="url">{doc.fileName} <span className="detail">{doc.fileSize}</span><i className="icon"></i></a>
                      </div>
                      
                    </div>
                  )}
                </div>
                
            </div>
          </section>            
          ))}
          
        </main>
        
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    portfolio: state.portfolio  
  }
  
}


export default connect(mapStateToProps, { fetchProjects, fetchCats })(MainResources);