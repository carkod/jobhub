import React, { Component } from "react";
import { Progress } from "semantic-ui-react";

class WebDev extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { webdevSkills } = this.props;

    return (
      <section id="webdev" className="skills">
        <h2 className="ui dividing header">
          Web Development{" "}
          <button
            className="btn"
            onClick={() => this.setState({ collapse: !this.state.collapse })}
          >
            <i className={this.state.collapse ? "plus icon" : "minus icon"} />{" "}
          </button>
        </h2>
        <div
          className={`ui grid ${this.state.collapse ? "hidden" : "visible"}`}
        >
          {webdevSkills.map((ed, i) => (
            <div key={i} className="row">
              <div className="label ten wide column computer stackable">
                <h4>
                  {ed.name} <small>{ed.desc}</small>
                </h4>
              </div>

              <div className="level six wide column computer stackable">
                <Progress
                  percent={ed.level.slice(0, -1)}
                  color="blue"
                  size="small"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default WebDev;
