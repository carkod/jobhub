import React, { Component } from "react";

const PD_FIELDS = [
  { key: "name", label: "First name" },
  { key: "lastname", label: "Surname" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "PC", label: "Post Code" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "nationality", label: "Nationality" },
];

export default class PD extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  render() {
    const { persdetails } = this.props;
    const { collapsed } = this.state;
    if (!persdetails) return null;

    return (
      <section id="details" className="ed-cv__section">
        <div className="ed-cv__section-header">
          <h2 className="ed-cv__section-title">Personal Details</h2>
          <button
            className="ed-cv__toggle"
            onClick={() => this.setState({ collapsed: !collapsed })}
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "+" : "−"}
          </button>
        </div>
        {!collapsed && (
          <div className="ed-pd-grid">
            {PD_FIELDS.filter(({ key }) => persdetails[key]).map(
              ({ key, label }) => (
                <div key={key} className="ed-pd-field">
                  <span className="ed-pd-field__label">{label}</span>
                  <span className="ed-pd-field__value">{persdetails[key]}</span>
                </div>
              ),
            )}
          </div>
        )}
      </section>
    );
  }
}
