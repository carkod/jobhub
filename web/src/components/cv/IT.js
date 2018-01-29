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

  render() {
    const {itSkills} = this.props;
    
    return (
      <section id="it" className="skills">
        <h2 className="ui dividing header">IT software <button className="btn" onClick={() => this.setState({collapse: !this.state.collapse})}><i className={this.state.collapse ? 'plus icon': 'minus icon'} /> </button></h2>
          <div className={`ui grid ${this.state.collapse ? 'hidden' : 'visible'}`}>
          {itSkills.map((ed, i) => 
            <div key={i} className="row">  
              <div className="label ten wide column sixteen wide column mobile">
                  <h4>{ed.name} <small>{ed.desc}</small></h4>
              </div>
              
              <div className="level six wide column sixteen wide column mobile">
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