/* eslint-disable */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';


class Nav extends Component {

	state = {
	}


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
					<div className="item uppercase">
						<NavLink to="/" activeClassName="current" >Home</NavLink>
					</div>
					<div className="item uppercase">
						<NavLink to="/cv" activeClassName="current" >CV</NavLink>
					</div>
					<div className="item uppercase">
						<NavLink to="/jobs" activeClassName="current" >Job board</NavLink>
						<div className="level-2 menu menu__reset-space">
							<div className="item uppercase">
								<NavLink to="/tracker" activeClassName="current" >Applications tracker</NavLink>
							</div>
						</div>
						<div className="level-2 menu menu__reset-space">
							<div className="item uppercase">
								<NavLink to="/new-tracker" activeClassName="current" >New application</NavLink>
							</div>
						</div>
						<div className="level-2 menu menu__reset-space">
							<div className="item uppercase">
								<NavLink to="/new-tracker" activeClassName="current" >Contacts</NavLink>
							</div>
						</div>
					</div>
					<div className="item uppercase">
						<NavLink to="/coverletters" activeClassName="current" >Cover Letters</NavLink>
					</div>
					<div className="item uppercase">
						<NavLink to="/relationships" activeClassName="current" >Relationships</NavLink>
					</div>
					
					<div className="item uppercase">
						<NavLink to="/portfolio" activeClassName="current" >Portfolio</NavLink>
					</div>
				</div>
			</nav>
		);
	}
}

export default Nav;
