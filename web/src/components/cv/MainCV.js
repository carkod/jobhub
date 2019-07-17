/* eslint-disable */

import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { fetchCV } from '../../actions/cv';
import Education from './Education';
import IT from './IT';
import Languages from './Languages';
import PD from './PD';
import WebDev from './WebDev';
import Work from './Work';

class MainCV extends Component {
    
  constructor(props) {
    super(props);
    const {cv} = this.props;
    
    this.state = {
      cv: cv,
    };
    
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.fetchCV(id);
  }
  
  render() {
    const {cv} = this.props;
    let fullCV;
    console.log(cv.pdf);
    if (!!cv.pdf) {
      fullCV = cv.pdf.find(i => i.value === 'f');
    }
    
    return (
      <div id="mainCV" className="container">
        <Helmet>
          <title>{`Carlos Wu - ${cv.name}`}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={`Carlos Wu - Professional Profile | ${cv.name}`}/>
          <link rel="canonical" href="http://carloswu.xyz/" />
        </Helmet>
        
        <main className="cvContent">
            <h1>Carlos Wu - <small>{cv.name}</small>{fullCV !== undefined ? <a href={fullCV.link} className="download"><i className="file pdf outline icon" /></a> : ''}</h1>
            <section id="summary">
              <h2>Summary and professional goals </h2>
              {/* <HtmlText text={cv.summary} /> */}
            </section>
            
            <PD persdetails={cv.persdetails}/>
            <Work workExp={cv.workExp} />            
            <Education educ={cv.educ} />
            <Languages langSkills={cv.langSkills} />
            {/*Optional fields*/}
            {cv.webdevSkills.length > 1 && cv.webdevSkills[0].name !== '' ? <WebDev webdevSkills={cv.webdevSkills} /> : ''}
            {cv.itSkills.length > 1 && cv.itSkills[0].name !== '' ? <IT itSkills={cv.itSkills} /> : ''}
            {/*<Others others={cv.others} />*/}
            
        </main>
        
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  
  return {
    cv: state.singleCV
  }
}


export default connect(mapStateToProps, { fetchCV })(MainCV);