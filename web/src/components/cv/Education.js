/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import HtmlText from './HtmlText';

class Education extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  
  render() {
    const {educ} = this.props;
    return (
      <section id="education">
                
        <h2 className="ui dividing header">Education <button className="btn" onClick={() => this.setState({collapse: !this.state.collapse})}><i className={this.state.collapse ? 'plus icon': 'minus icon'} /> </button></h2>
          {educ.map((ed, i) => 
            <div key={i} className={`ui grid ${this.state.collapse ? 'hidden' : 'visible'}`}>
              <div className="workplace six wide column">
                  <h3>{ed.insitution}</h3>
              </div>
              
              <div className="position ten wide column">
                  <h3>{ed.diploma}</h3>
              </div>
              <div className="work-date six wide column">
                  {ed.date}
              </div>
              
              <div className="work-desc ten wide column">
                <HtmlText text={ed.desc} />
              </div>
            </div>
          )}
                
      </section>
    );
  }
}


export default Education;