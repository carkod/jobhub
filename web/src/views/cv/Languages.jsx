import React, { Component } from "react";

export default class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  render() {
    const { langSkills } = this.props;
    const { collapsed } = this.state;
    return (
      <section id="languages" className="ed-cv__section">
        <div className="ed-cv__section-header">
          <h2 className="ed-cv__section-title">Languages</h2>
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
            {langSkills.map((lang, i) => (
              <div key={i} className="ed-skill-row">
                <div className="ed-skill-row__label">
                  <span className="ed-skill-row__name">{lang.name}</span>
                  {lang.desc && (
                    <span className="ed-skill-row__desc">{lang.desc}</span>
                  )}
                </div>
                <div className="ed-skill-bar">
                  <div
                    className="ed-skill-bar__fill ed-skill-bar__fill--amber"
                    style={{ width: lang.level }}
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
