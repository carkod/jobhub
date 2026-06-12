import React, { Component } from "react";

export default class Links extends Component {
  render() {
    const { links } = this.props;
    if (!links || links.length === 0) return null;
    return (
      <div className="ed-project__links">
        <h4 className="ed-project__aside-title">Links</h4>
        <ul className="ed-project__link-list">
          {links.map((link, i) => (
            <li key={link.id || i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-project__link"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
