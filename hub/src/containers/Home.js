/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

export default class Home extends Component {
  
  logout() {
    console.log('clicked logout')
  }

  render() {
    return (
      <div className="home">
        <h1>This is Home</h1>
        <Button onClick={this.logout}>
          Log out
        </Button>
      </div>
    );
  }
}
