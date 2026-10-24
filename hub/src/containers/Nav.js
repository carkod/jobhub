import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const sections = [
  { to: "/", label: "HOME", icon: "home", end: true },
  { to: "/cv", label: "CV", icon: "file alternate outline" },
  { to: "/ai-cv", label: "AI CV", icon: "magic" },
  { to: "/coverletters", label: "COVER LETTERS", icon: "envelope outline" },
  { to: "/relationships", label: "RELATIONSHIPS", icon: "users" },
  { to: "/portfolio", label: "PORTFOLIO", icon: "briefcase" },
  { to: "/blog", label: "BLOG", icon: "edit outline" },
];

export default function Nav({ onClose, onNavigate }) {
  return (
    <nav id="hub-navigation" className="hub-nav" aria-label="Hub navigation">
      <div className="hub-nav__brand">
        <span className="hub-nav__wordmark">Carlos Wu</span>
        <span className="hub-nav__caption">JobHub / Editor</span>
      </div>
      {onClose && (
        <button
          type="button"
          className="hub-nav__close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          ×
        </button>
      )}
      <div className="hub-nav__links">
        {sections.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="hub-nav__link"
            onClick={onNavigate}
          >
            <Icon className="hub-nav__icon" name={icon} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
