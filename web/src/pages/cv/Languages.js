import React, { Component } from "react";
import { Progress } from "semantic-ui-react";

class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { langSkills } = this.props;
    return (
      <section id="languages" className="skills">
        <h2 className="ui dividing header">
          Languages{" "}
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
          {langSkills.map((ed, i) => (
            <div key={i} className="row">
              <div className="label ten wide column stackable">
                <h4>
                  {ed.name} <small>{ed.desc}</small>
                </h4>
              </div>

              <div className="level six wide column stackable">
                <Progress
                  percent={ed.level.slice(0, -1)}
                  color="orange"
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

export default Languages;
