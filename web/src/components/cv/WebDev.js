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
      <section id="webdev" className="skills">
                
        <h2 className="ui dividing header">Web Development</h2>
          <div className="ui grid">
          {webdevSkills.map((ed, i) => 
            <div key={i} className="row">  
              <div className="label ten wide column sixteen wide column mobile">
                  <h4>{ed.name} <small>{ed.desc}</small></h4>
              </div>
              
              <div className="level six wide column sixteen wide column mobile">
                  <div className="ui small blue progress">
                    <div className="bar" style={{width:ed.level}}></div>
                  </div>

              </div>
              
            </div>
          )}
          </div>
    </section>
    );
  }
}


export default WebDev;