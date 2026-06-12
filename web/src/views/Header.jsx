import React, { useState, useEffect } from "react";
import NavLink from "../components/NavLink";
import Link from "next/link";
import { useRouter } from "next/router";

const NAV_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/cv", label: "CV" },
  { to: "/about", label: "FAQs" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="ed-header">
      <Link href="/" className="ed-wordmark">Carlos Wu</Link>

      <nav aria-label="Main navigation">
        <ul className="ed-nav ed-nav--desktop">
          {NAV_LINKS.map(({ to, label, exact }) => (
            <li key={to} className="ed-nav__item">
              <NavLink exact={exact} to={to} activeClassName="active" className="ed-nav__link">
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={`ed-hamburger${open ? " ed-hamburger--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="ed-mobile-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <nav
        className={`ed-mobile-nav${open ? " ed-mobile-nav--open" : ""}`}
        aria-hidden={!open}
      >
        <ul className="ed-mobile-nav__list">
          {NAV_LINKS.map(({ to, label, exact }) => (
            <li key={to}>
              <NavLink exact={exact} to={to} activeClassName="active" className="ed-mobile-nav__link">
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
