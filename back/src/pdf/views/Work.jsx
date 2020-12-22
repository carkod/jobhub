/* eslint-disable */

import React, { Component } from "react";

class Work extends Component {
  render() {
    const { workExp, title } = this.props;

    return (
      <section id="work">
        <h2 className="ui dividing header">{title}</h2>
        {workExp.map((work, i) => (
          <div key={i} className="ui grid" style={{"pageBreakInside": "avoid", "pageBreakInside": "always"}}>
            <div className="row">
              <div className="workplace eight wide column">
                <h4>{work.company}</h4>
              </div>

              <div className="position eight wide column">
                <h4>{work.position}</h4>
              </div>
            </div>
            <div className="row">
              <div className="work-date eight wide column">
                <p>{work.date}</p>
              </div>

                <div
                  className="desc eight wide column"
                  dangerouslySetInnerHTML={{ __html: work.desc }}
                />
              </div>
          </div>
        ))}
      </section>
    );
  }
}

export default Work;
