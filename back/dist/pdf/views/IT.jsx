/* eslint-disable */

import React, { Component } from 'react';

class IT extends Component {
   
  render() {
    const {itSkills} = this.props;
    
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