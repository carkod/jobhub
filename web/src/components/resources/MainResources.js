/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import {stateToHTML} from 'draft-js-export-html';
import { fetchProjects } from '../../actions/res';

class MainResources extends Component {
    
    constructor(props) {
    super(props);
    const {cv} = this.props;
    
    this.state = {
      cv: cv,
    };
    
  }

  componentDidMount = () => {
    this.props.fetchProjects();
  }
  
  componentWillReceiveProps = (props) => {
    console.log(props)
    const {cv} = props;
    this.setState({cv: cv});
    
  }
  
  render() {
    const {cv} = !!Object.keys(this.state).length ? this.state : this.props;
    console.log(cv)
    return (
      <div id="mainCV" className="container">
        <Helmet>
          <title>{`Carlos Wu - ${cv.name}`}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={`Carlos Wu - Professional Profile | ${cv.name}`}/>
          <link rel="canonical" href="http://carloswu.xyz/" />
        </Helmet>
        
        <main className="cvContent">
            <h1>Carlos Wu - <small>{cv.name}</small></h1>
            <section id="summary">
              <h2>Summary and professional goals</h2>
              <HtmlText text={cv.summary} />
            </section>
            <PD persdetails={cv.persdetails}/>
            <Work workExp={cv.workExp} />            
            <Education educ={cv.educ} />
            <Languages langSkills={cv.langSkills} />
            <WebDev webdevSkills={cv.webdevSkills} />
            <IT itSkills={cv.itSkills} />
            {/*<Others others={cv.others} />*/}
            
        </main>
        
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  
  return {}
  
}


export default connect(mapStateToProps, { fetchProjects })(MainResources);