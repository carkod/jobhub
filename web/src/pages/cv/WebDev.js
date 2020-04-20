/* eslint-disable */

import React, { Component } from 'react';


class WebDev extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  render() {
    const {webdevSkills} = this.props;
    
    return (
      <section id="webdev" className="skills">
                
        <h2 className="ui dividing header">Web Development <button className="btn" onClick={() => this.setState({collapse: !this.state.collapse})}><i className={this.state.collapse ? 'plus icon': 'minus icon'} /> </button></h2>
          <div className={`ui grid ${this.state.collapse ? 'hidden' : 'visible'}`}>
          {webdevSkills.map((ed, i) => 
            <div key={i} className="row">  
              <div className="label ten wide column computer stackable">
                  <h4>{ed.name} <small>{ed.desc}</small></h4>
              </div>
              
              <div className="level six wide column computer stackable">
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