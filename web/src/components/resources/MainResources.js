/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import {stateToHTML} from 'draft-js-export-html';
import { fetchProjects } from '../../actions/res';
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
        
        <main className="portfolioContent">
            <h1>{'Name of Category'} - <small>{portfolio.name}</small></h1>
            <section id="summary">
              <h2>Summary and professional goals</h2>
              
            </section>
            
        </main>
        
      </div>
    );
  }
}

const matchProject = (item, props) => {
    
    // Create status in HUB application
    try {
        if (item.cats.position.toLowerCase() !== props.match.params.position.toLowerCase()) throw "Could not match position";
        if (item.cats.status !== 'public') throw "could not find status public"
    } catch (e) {
        //console.log(e)
    }
    console.log(item.cats.status === 'public' && item.cats.position.toLowerCase() === props.match.params.position.toLowerCase())
    return item.cats.status === 'public' && item.cats.position.toLowerCase() === props.match.params.position.toLowerCase();
    
}


const mapStateToProps = (state, props) => {
    
  if (!!state.portfolio[0]._id) {
      //console.log(state)
      // set position front-end in hub
      // findIndex item.portfolio.position === props.match.params.portfolio.position
      // if unable to find index throw error
      
      const matchIndex = state.portfolio.findIndex(item => matchProject(item, props))
      console.log('have an ID, therefore find correct project')
      //console.log(matchIndex)
      return {
        portfolio: state.portfolio[matchIndex]   
      }
  } else {
    console.log('NO ID dummy data')
      return {
        portfolio: state.portfolio[0]
      }
  }
  
}


export default connect(mapStateToProps, { fetchProjects })(MainResources);