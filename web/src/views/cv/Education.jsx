import React, { Component } from "react";
import HtmlText from "../../components/HtmlText";

export default class Education extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  render() {
    const { educ } = this.props;
    const { collapsed } = this.state;
    return (
      <section id="education" className="ed-cv__section">
        <div className="ed-cv__section-header">
          <h2 className="ed-cv__section-title">Education</h2>
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
            {educ.map((ed, i) => (
              <div key={i} className="ed-edu-entry">
                <h3>{ed.diploma}</h3>
                <div className="ed-edu-entry__school">{ed.institution}</div>
                {ed.date && <div className="ed-edu-entry__year">{ed.date}</div>}
                {ed.desc && (
                  <div className="ed-edu-entry__desc">
                    <HtmlText text={ed.desc} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}
