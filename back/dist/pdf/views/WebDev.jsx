/* eslint-disable */

import React, { Component } from 'react';

class WebDev extends Component {
  
  render() {
    const {webdevSkills} = this.props;
    
    return (
      <section id="webdev" className="skills">
                
        <h2 className="ui dividing header">Web Development</h2>
          <div className="ui grid">
          {webdevSkills.map((ed, i) => 
            <div key={i} className="row">  
              <div className="label ten wide column">
                  <h4>{ed.name} <small>{ed.desc}</small></h4>
              </div>
              
              <div className="level six wide column">
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