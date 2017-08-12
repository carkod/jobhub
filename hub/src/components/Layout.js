/* eslint-disable */

import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Sidebar, Button, Header, Segment, Menu } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

class Layout extends Component {
  
  state = {
    visible: true,
  }

  
  componentDidMount = () => {
    
  }
  
  toggleVisibility = () => this.setState({ visible:!this.state.visible });
  
  render() {
    return (
      <div className="layout">
      <Header as="h1">This is List</Header>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              CV
            </Menu.Item>
            <Menu.Item name='camera'>
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              {/* Content starts here */}
              
              {this.props.children}
              
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        
      </div>
    );
  }
}

export default Layout;
