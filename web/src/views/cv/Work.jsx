import React, { Component } from "react";
import HtmlText from "../../components/HtmlText";

export default class Work extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  render() {
    const { workExp } = this.props;
    const { collapsed } = this.state;
    return (
      <section id="work" className="ed-cv__section">
        <div className="ed-cv__section-header">
          <h2 className="ed-cv__section-title">Work Experience</h2>
          <button
            className="ed-cv__toggle"
            onClick={() => this.setState({ collapsed: !collapsed })}
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "+" : "−"}
          </button>
        </div>
        {!collapsed && (
          <div className="ed-cv__entries">
            {workExp.map((work, i) => (
              <div key={i} className="ed-entry">
                <div className="ed-entry__header">
                  <div>
                    <div className="ed-entry__company">{work.company}</div>
                    <div className="ed-entry__role">{work.position}</div>
                  </div>
                  <div className="ed-entry__date">{work.date}</div>
                </div>
                <div className="ed-entry__body">
                  <HtmlText text={work.desc} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}
