/* eslint-disable */

import React, { Component } from 'react';

class Work extends Component {
    
  render() {
    const {workExp} = this.props;
    
    return (
      <section id="work">
      <h2 className="ui dividing header">Work Experience</h2>
      {workExp.map((work, i) => 
        <div key={i} className="ui grid">
          <div className="workplace six wide column">
              <h3>{work.company}</h3>
          </div>
          
          <div className="position ten wide column">
              <h3>{work.position}</h3>
          </div>
          <div className="work-date six wide column">
              {work.date}
          </div>
          
          <div className="work-desc ten wide column">
            <div className="desc" dangerouslySetInnerHTML={{__html: work.desc}} />
          </div>
        </div>
      )}
        
      </section>
    );
  }
}


export default Work;