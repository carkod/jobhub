/* eslint-disable */

import React, { Component } from 'react';

class Languages extends Component {
  
  render() {
    const {langSkills} = this.props;
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