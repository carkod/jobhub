import React, { Component } from "react";

export default class IT extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  render() {
    const { itSkills } = this.props;
    const { collapsed } = this.state;
    return (
      <section id="it" className="ed-cv__section">
        <div className="ed-cv__section-header">
          <h2 className="ed-cv__section-title">IT Software</h2>
          <button
            className="ed-cv__toggle"
            onClick={() => this.setState({ collapsed: !collapsed })}
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "+" : "−"}
          </button>
        </div>
        {!collapsed && (
          <div className="ed-cv__skill-list">
            {itSkills.map((skill, i) => (
              <div key={i} className="ed-skill-row">
                <div className="ed-skill-row__label">
                  <span className="ed-skill-row__name">{skill.name}</span>
                  {skill.desc && <span className="ed-skill-row__desc">{skill.desc}</span>}
                </div>
                <div className="ed-skill-bar">
                  <div
                    className="ed-skill-bar__fill ed-skill-bar__fill--ink"
                    style={{ width: skill.level }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}
