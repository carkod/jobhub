/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import {stateToHTML} from 'draft-js-export-html';
import { saveCV, fetchCVs } from '../../actions/cv';
import PD from './PD';
import HtmlText from './HtmlText';
import Work from './Work';
import Education from './Education';
import Languages from './Languages';
import WebDev from './WebDev';
import IT from './IT';

class MainCV extends Component {
    
    constructor(props) {
    super(props);
    const {cv} = this.props;
    
    this.state = {
      cv: cv,
    };
    
  }

  componentDidMount = () => {
    this.props.fetchCVs();
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
            
            <section id="webdev">
                <p className="details">First name: {'whatever data'}</p>
                <p className="details">Last name: {'whatever data'}</p>
                <p className="details">Nationality: {'whatever data'}</p>
                <p className="details">Address: {'whatever data'}</p>
            </section>
            
            <section id="it-skills">
                <p className="details">First name: {'whatever data'}</p>
                <p className="details">Last name: {'whatever data'}</p>
                <p className="details">Nationality: {'whatever data'}</p>
                <p className="details">Address: {'whatever data'}</p>
            </section>
            
            <section id="others">
                <p className="details">First name: {'whatever data'}</p>
                <p className="details">Last name: {'whatever data'}</p>
                <p className="details">Nationality: {'whatever data'}</p>
                <p className="details">Address: {'whatever data'}</p>
            </section>
            
        </main>
        
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  
  // Receive list of CVs
    // Check if there is a CV with status public
    // Check if this CV matches the Position
  // If all positive show CV
  // if one of them fails tell sidebar not to show this position on the sidebar
  
  
  if (!!state.cvs[0]._id) {
    //const cv = state.cvs.find(item => item._id === props.match.params.id);
    
    let cv = state.cvs.find(item => {
      try {
        if (item.cats.status !== 'public') throw new Error("Could not find status:Public CV");
        if (item.cats.position.toLowerCase() !== props.match.params.position.toLowerCase()) throw "Could not find CV that matches position in the URL"
      } catch (e) {
        console.log(e)
      }
      
        return item.cats.status === 'public' && item.cats.position.toLowerCase() === props.match.params.position.toLowerCase();
    });
    
    if (cv !== undefined) {
      return {
        cv: cv,
      }
    } else {
     return {} 
    }
    
  } else {
    return { 
      cv: state.cvs[0],
    }    
  }
  
}


export default connect(mapStateToProps, { saveCV, fetchCVs })(MainCV);