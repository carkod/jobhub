/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";

class Work extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (props) => {
    const {others} = props;
    this.setState({ others })
  }
  
  render() {
    const {others} = !!Object.keys(this.state).length ? this.state : this.props;
    
    return (
      <section id="it" className="skills">
        <h2 className="ui dividing header">IT software</h2>
          <div className="ui grid">
          {others.map((ed, i) => 
            <div key={i} className="row">  
              <div className="label ten wide column">
                  <h4>{ed.name} <small>{ed.desc}</small></h4>
              </div>
              
              <div className="level six wide column">
                  <div className="ui small grey progress">
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


export default Work;