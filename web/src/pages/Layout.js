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
        <Notification {...this.props}/>
        <div id="main">
          <button id="burger" className="mobile only" onClick={() => this.setState({navigation: !this.state.navigation})} ><i className="cube icon" /></button>
          <div className={this.state.navigation ? "lefty open" : "lefty close"}>
            <div className="sidebar-container">
              <Sidebar unavailable={() => this.setState({dimmer:true})}/>
            </div>
          </div>
          
          <div className="righty">
            {this.props.children}
          </div>
            
        </div>
      </div>
    );
  }
}

export default Layout;
