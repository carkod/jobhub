import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Notification from '../components/Notification';

const duration = 300;

const defaultStyle = {
  transition: `transform 200ms ease-in-out`,
  transform: 'translateX(-100%)',
  backgroundColor: 'blue',
}

const transitionStyles = {
  entering: { transform: 'translateX(-10%)' },
  entered: { transform: 'translateX(0%)' },
};

class Layout extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      openmenu: false,
      active: false,
    }
  }
  
  render() {
    return (
      <div className="layout">
        <div className="background-letters">Carlos</div>
        <Notification {...this.props}/>
        <main id="main">
          <button id="burger" className="mobile only" onClick={() => this.setState({navigation: !this.state.navigation})} ><i className="cube icon" /></button>
          <div className={this.state.navigation ? "lefty open" : "lefty close"}>
            <div className="sidebar-container">
              <Sidebar unavailable={() => this.setState({dimmer:true})}/>
            </div>
          </div>
          
          <div className="righty">
            {this.props.children}
          </div>
            
        </main>
        <div className={`ui dimmer transition ${this.state.dimmer ? 'visible active' : 'hidden'}`} onClick={() => this.setState({dimmer: !this.state.dimmer})}>
          <div className="content">
            <div className="center">
              <h2 className="ui inverted icon header">
                <i className="protect icon" />
                <span>THIS CONTENT IS NOT AVAILABLE</span>
                <hr />
                <div className="sub header">
                  It might be restricted or still under development, please contact me to get access.
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
