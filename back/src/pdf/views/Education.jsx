/* eslint-disable */

import React, { Component } from 'react';

class Education extends Component {
    
  render() {
    const {educ} = this.props;
    return (
      <section id="education">
                
        <h2 className="ui dividing header">Education</h2>
          {educ.map((ed, i) => 
            <div key={i} className="ui grid">
              <div className="workplace six wide column">
                  <h3>{ed.institution}</h3>
              </div>
              
              <div className="position ten wide column">
                  <h3>{ed.diploma}</h3>
              </div>
              <div className="work-date six wide column">
                  {ed.date}
              </div>
              
              <div className="work-desc ten wide column">
                <div className="desc" dangerouslySetInnerHTML={{__html: ed.desc}} />
              </div>
                  
            </div>
          )}
                
      </section>
    );
  }
}


export default Education;