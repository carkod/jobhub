/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import HtmlText from './HtmlText';


class Languages extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (props) => {
    const {langSkills} = props;
    this.setState({ langSkills })
  }
  
  
  render() {
    const {langSkills} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <section id="languages" className="skills">
                
        <h2 className="ui dividing header">Languages</h2>
          <div className="ui grid">
          {langSkills.map((ed, i) => 
            <div key={i} className="row">  
              <div className="label ten wide column">
                  <h4>{ed.name} <small>{ed.desc}</small></h4>
              </div>
              
              <div className="level six wide column">
                  <div className="ui small orange progress">
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


export default Languages;