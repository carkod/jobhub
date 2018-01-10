/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import HtmlText from './HtmlText';


class WebDev extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (props) => {
    const {webdevSkills} = props;
    this.setState({ webdevSkills })
  }
  
  render() {
    const {webdevSkills} = !!Object.keys(this.state).length ? this.state : this.props;
    
    return (
      <section id="languages">
                
        <h2 className="ui dividing header">Languages</h2>
          {webdevSkills.map((ed, i) => 
            <div key={i} className="ui grid">
              <div className="row">
                  <div className="workplace six wide column">
                      <h3>{ed.insitution}</h3>
                  </div>
                  
                  <div className="position ten wide column">
                      <h3>{ed.diploma}</h3>
                  </div>
              </div>
              <div className="row">
                  <div className="ed-date six wide column">
                      {ed.date}
                  </div>
                  
                  <div className="ed-desc ten wide column">
                    <HtmlText text={ed.desc} />
                  </div>
                  
              </div>
            </div>
          )}
                
    </section>
    );
  }
}


export default WebDev;