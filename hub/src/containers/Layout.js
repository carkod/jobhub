import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Notifications from "../components/Notification";

export default function Layout() {
  const [navVisible, setNavVisible] = useState(() => window.innerWidth > 900);

  const closeMobileNav = () => {
    if (window.innerWidth <= 900) setNavVisible(false);
  };

  return (
    <div className={`hub-layout${navVisible ? " hub-layout--nav-open" : ""}`}>
      <Nav onClose={() => setNavVisible(false)} onNavigate={closeMobileNav} />
      <main className="hub-main">
        <div className="hub-toolbar">
          <button
            type="button"
            className="hub-nav-toggle"
            onClick={() => setNavVisible((visible) => !visible)}
            aria-label={navVisible ? "Hide navigation" : "Show navigation"}
            aria-expanded={navVisible}
            aria-controls="hub-navigation"
          >
            <span aria-hidden="true">☰</span>
            <span>Menu</span>
          </button>
          <span className="hub-toolbar__label">Content studio</span>
        </div>
        <div className="hub-content">
          <Outlet />
        </div>
      </main>
      <Notifications />
    </div>
  );
}
