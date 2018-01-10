/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import HtmlText from './HtmlText';

class Work extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (props) => {
    const {workExp} = props;
    this.setState({ workExp })
  }
  
  render() {
    const {workExp} = !!Object.keys(this.state).length ? this.state : this.props;
    
    return (
      <section id="work">
      <h2 className="ui dividing header">Work Experience</h2>
      {workExp.map((work, i) => 
        <div key={i} className="ui grid">
          <div className="row">
              <div className="workplace six wide column">
                  <h3>{work.company}</h3>
              </div>
              
              <div className="position ten wide column">
                  <h3>{work.position}</h3>
              </div>
          </div>
          <div className="row">
              <div className="work-date six wide column">
                  {work.date}
              </div>
              
              <div className="work-desc ten wide column">
                <HtmlText text={work.desc} />
              </div>
              
          </div>
        </div>
      )}
        
      </section>
    );
  }
}


export default Work;