/* eslint-disable */

import React, { Component } from "react";

class Languages extends Component {
  render() {
    const { langSkills, webdevSkills } = this.props;
    return (
      <section id="languages" className="skills">
        <div className="ui grid">
          <div className="eight wide column">
            <h2 className="ui dividing header">Languages</h2>
            {langSkills.map((ed, i) => (
              <div key={i}>
                <p>
                  {ed.name} <small>{ed.desc}</small>
                </p>
              </div>
            ))}
          </div>
          <div className="eight wide column">
            <h2 className="ui dividing header">Web Development</h2>
            {webdevSkills.map((ed, i) => (
              <div key={i}>
                <p>
                  {ed.name} <small>{ed.desc}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Languages;
