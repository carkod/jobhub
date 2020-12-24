/* eslint-disable */
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';


class Nav extends Component {

	render() {

		const style = {
			background: '#1b1c1d',
			position: 'fixed',
			top: '0',
			left: '0',
			minHeight: '100%',
			overflowY: 'scroll',
		}

		return (
			<nav className="sidenav" style={style}>
				<div className="ui inverted vertical pointed menu">
					<div className="item">
						<NavLink to="/" activeClassName="current" className="u-section-title">HOME</NavLink>
					</div>
					<div className="item">
						<NavLink to="/cv" activeClassName="current" className="u-section-title">CV</NavLink>
					</div>
					<div className="item">
						<a>JOB BOARD</a>
						<div className="level-2 menu menu__reset-space">
							<div className="item">
								<NavLink to="/tracker" activeClassName="current" className="u-section-title">APPLICATION TRACKER</NavLink>
							</div>
						</div>
						<div className="level-2 menu menu__reset-space">
							<div className="item">
								<NavLink to="/new-tracker" activeClassName="current" className="u-section-title">NEW APPLICATION</NavLink>
							</div>
						</div>
					</div>
					<div className="item">
						<NavLink to="/coverletters" activeClassName="current" className="u-section-title">COVER LETTERS</NavLink>
					</div>
					<div className="item">
						<NavLink to="/relationships" activeClassName="current" className="u-section-title">RELATIONSHIPS</NavLink>
					</div>
					
					<div className="item">
						<NavLink to="/portfolio" activeClassName="current" className="u-section-title">PORTFOLIO</NavLink>
					</div>
				</div>
			</nav>
		);
	}
}

export default Nav;
