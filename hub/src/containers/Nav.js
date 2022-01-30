import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    const style = {
      background: "#1b1c1d",
      position: "fixed",
      top: "0",
      left: "0",
      minHeight: "100%",
      overflowY: "scroll",
    };

    return (
      <nav className="sidenav" style={style}>
        <div className="ui inverted vertical pointed menu">
          <div className="item">
            <NavLink to="/" className="u-section-title">
              HOME
            </NavLink>
          </div>
          <div className="item">
            <NavLink to="/cv" className="u-section-title">
              CV
            </NavLink>
          </div>
          <div className="item">
            <a>JOB BOARD</a>
            <div className="level-2 menu menu__reset-space">
              <div className="item">
                <NavLink to="/tracker" className="u-section-title">
                  APPLICATION TRACKER
                </NavLink>
              </div>
            </div>
            <div className="level-2 menu menu__reset-space">
              <div className="item">
                <NavLink to="/new-tracker" className="u-section-title">
                  NEW APPLICATION
                </NavLink>
              </div>
            </div>
          </div>
          <div className="item">
            <NavLink to="/coverletters" className="u-section-title">
              COVER LETTERS
            </NavLink>
          </div>
          <div className="item">
            <NavLink to="/relationships" className="u-section-title">
              RELATIONSHIPS
            </NavLink>
          </div>

          <div className="item">
            <NavLink to="/portfolio" className="u-section-title">
              PORTFOLIO
            </NavLink>
          </div>
          <div className="item">
            <NavLink to="/blog" className="u-section-title">
              BLOG
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
