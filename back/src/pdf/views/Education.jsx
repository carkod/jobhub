/* eslint-disable */

import React, { Component } from "react";

class Education extends Component {
  render() {
    const { educ, title } = this.props;
    return (
      <section id="education">
        <h2 className="ui dividing header">{title}</h2>
        {educ.map((ed, i) => (
          <div key={i} className="ui grid" style={{"pageBreakInside": "avoid", "pageBreakInside": "always"}}>
            <div className="row">
              <div className="workplace eight wide column">
                <h4>{ed.institution}</h4>
              </div>

              <div className="position eight wide column">
                <h4>{ed.diploma}</h4>
              </div>
            </div>
            <div className="row">
              <div className="work-date eight wide column">
                <p>{ed.date}</p>
              </div>
              <div className="work-desc eight wide column">
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: ed.desc }}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}

export default Education;
