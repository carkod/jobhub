/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import HtmlText from './HtmlText';

class IT extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (props) => {
    const {itSkills} = props;
    this.setState({ itSkills })
  }
  
  render() {
    const {itSkills} = !!Object.keys(this.state).length ? this.state : this.props;
    
    return (
      <section id="it" className="skills">
        <h2 className="ui dividing header">IT software</h2>
          <div className="ui grid">
          {itSkills.map((ed, i) => 
            <div key={i} className="row">  
              <div className="label ten wide column">
                  <h4>{ed.name} <small>{ed.desc}</small></h4>
              </div>
              
              <div className="level six wide column">
                  <div className="ui small purple progress">
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


export default IT;