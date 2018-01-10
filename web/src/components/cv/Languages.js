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
      <section id="languages">
                
        <h2 className="ui dividing header">Languages</h2>
          {langSkills.map((ed, i) => 
            <div key={i} className="ui grid">
              <div className="row">
                  <div className="workplace six wide column">
                      <h3>{ed.insitution}</h3>
                  </div>
                  
                  <div className="position ten wide column">
                      <h3>{ed.diploma}</h3>
                  </div>
              </div>
              <div className="row">
                  <div className="ed-date six wide column">
                      {ed.date}
                  </div>
                  
                  <div className="ed-desc ten wide column">
                    <HtmlText text={ed.desc} />
                  </div>
                  
              </div>
            </div>
          )}
                
    </section>
    );
  }
}


export default Languages;