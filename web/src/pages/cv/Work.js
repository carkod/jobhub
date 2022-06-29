import React, { Component } from "react";
import HtmlText from "../../components/HtmlText";

export default class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { workExp } = this.props;

    return (
      <section id="work">
        <h2 className="ui dividing header">
          Work Experience{" "}
          <button
            className="btn"
            onClick={() => this.setState({ collapse: !this.state.collapse })}
          >
            <i className={this.state.collapse ? "plus icon" : "minus icon"} />{" "}
          </button>
        </h2>
        {workExp.map((work, i) => (
          <div
            key={i}
            className={`ui grid ${this.state.collapse ? "hidden" : "visible"}`}
          >
            <div className="workplace six wide column">
              <h3>{work.company}</h3>
            </div>

            <div className="position ten wide column">
              <h3>{work.position}</h3>
            </div>
            <div className="work-date six wide column">{work.date}</div>

            <div className="work-desc ten wide column">
              <HtmlText text={work.desc} />
            </div>
          </div>
        ))}
      </section>
    );
  }
}
