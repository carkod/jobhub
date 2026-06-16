"use client";

import React, { useEffect, useRef, useState } from "react";
import NavLink from "../components/NavLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCVNav } from "../actions/cv";
import { fetchPortfolioNav } from "../actions/res";

const SIMPLE_NAV_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "FAQs" },
  { to: "/blog", label: "Blog" },
];

function createCVOptions(cvs) {
  return cvs
    .filter((cv) => cv.slug || cv._id)
    .map((cv) => {
      const language = cv.cats?.locale || "en-GB";
      const id = cv.slug || cv._id;

      return {
        key: cv._id,
        label: cv.navName || "CV",
        href: `/cv/${encodeURIComponent(language)}/${encodeURIComponent(id)}`,
      };
    });
}

function createPortfolioOptions(projects) {
  const categories = new Map();

  projects.forEach((project) => {
    const position = project.cats?.position?.trim();
    const language = project.cats?.locale || "en-GB";

    if (!position) return;

    const key = `${language}:${position.toLowerCase()}`;
    if (!categories.has(key)) {
      categories.set(key, {
        key,
        label: position,
        href: `/portfolio/${encodeURIComponent(language)}/${encodeURIComponent(position)}`,
      });
    }
  });

  return Array.from(categories.values());
}

function DropdownItems({ options, loading, onNavigate }) {
  if (loading) {
    return <li className="ed-nav__dropdown-status">Loading…</li>;
  }

  if (options.length === 0) {
    return <li className="ed-nav__dropdown-status">None available</li>;
  }

  return options.map((option) => (
    <li key={option.key}>
      <Link
        href={option.href}
        className="ed-nav__dropdown-link"
        onClick={onNavigate}
      >
        {option.label}
      </Link>
    </li>
  ));
}

function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [cvOptions, setCVOptions] = useState([]);
  const [portfolioOptions, setPortfolioOptions] = useState([]);
  const [navigationLoading, setNavigationLoading] = useState(true);
  const headerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [pathname]);

  useEffect(() => {
    let active = true;

    Promise.allSettled([fetchCVNav(), fetchPortfolioNav()]).then(
      ([cvsResult, portfolioResult]) => {
        if (!active) return;

        if (cvsResult.status === "fulfilled") {
          setCVOptions(
            createCVOptions(
              Array.isArray(cvsResult.value) ? cvsResult.value : [],
            ),
          );
        }
        if (portfolioResult.status === "fulfilled") {
          setPortfolioOptions(
            createPortfolioOptions(
              Array.isArray(portfolioResult.value) ? portfolioResult.value : [],
            ),
          );
        }
        setNavigationLoading(false);
      },
    );

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("pointerdown", closeDropdown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeDropdown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const dropdowns = [
    { id: "cv", label: "CV", options: cvOptions },
    { id: "portfolio", label: "Portfolio", options: portfolioOptions },
  ];
  const desktopLinks = [
    SIMPLE_NAV_LINKS[0],
    dropdowns[0],
    SIMPLE_NAV_LINKS[1],
    dropdowns[1],
    SIMPLE_NAV_LINKS[2],
  ];

  return (
    <header ref={headerRef} className="ed-header">
      <Link href="/" className="ed-wordmark">
        Carlos Wu
      </Link>

      <nav aria-label="Main navigation">
        <ul className="ed-nav ed-nav--desktop">
          {desktopLinks.map((item) => {
            if (item.to) {
              return (
                <li key={item.to} className="ed-nav__item">
                  <NavLink
                    exact={item.exact}
                    to={item.to}
                    activeClassName="active"
                    className="ed-nav__link"
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            }

            const expanded = activeDropdown === item.id;
            const routeActive = pathname.startsWith(`/${item.id}/`);

            return (
              <li
                key={item.id}
                className={`ed-nav__item ed-nav__dropdown${expanded ? " ed-nav__dropdown--open" : ""}`}
              >
                <button
                  type="button"
                  className={`ed-nav__link ed-nav__dropdown-toggle${routeActive ? " active" : ""}`}
                  aria-expanded={expanded}
                  aria-controls={`${item.id}-desktop-menu`}
                  onClick={() => setActiveDropdown(expanded ? null : item.id)}
                >
                  {item.label}
                  <span className="ed-nav__chevron" aria-hidden="true" />
                </button>
                <ul
                  id={`${item.id}-desktop-menu`}
                  className="ed-nav__dropdown-menu"
                >
                  <DropdownItems
                    options={item.options}
                    loading={navigationLoading}
                    onNavigate={() => setActiveDropdown(null)}
                  />
                </ul>
              </li>
            );
          })}
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
        <div
          className="ed-mobile-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        className={`ed-mobile-nav${open ? " ed-mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={open ? undefined : ""}
      >
        <ul className="ed-mobile-nav__list">
          {desktopLinks.map((item) => {
            if (item.to) {
              return (
                <li key={item.to}>
                  <NavLink
                    exact={item.exact}
                    to={item.to}
                    activeClassName="active"
                    className="ed-mobile-nav__link"
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            }

            const expanded = mobileDropdown === item.id;
            const routeActive = pathname.startsWith(`/${item.id}/`);

            return (
              <li key={item.id} className="ed-mobile-nav__dropdown">
                <button
                  type="button"
                  className={`ed-mobile-nav__link ed-mobile-nav__dropdown-toggle${routeActive ? " active" : ""}`}
                  aria-expanded={expanded}
                  aria-controls={`${item.id}-mobile-menu`}
                  onClick={() => setMobileDropdown(expanded ? null : item.id)}
                >
                  {item.label}
                  <span className="ed-nav__chevron" aria-hidden="true" />
                </button>
                {expanded && (
                  <ul
                    id={`${item.id}-mobile-menu`}
                    className="ed-mobile-nav__submenu"
                  >
                    <DropdownItems
                      options={item.options}
                      loading={navigationLoading}
                      onNavigate={() => setOpen(false)}
                    />
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
