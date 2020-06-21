/* eslint-disable */

import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

export default class Home extends Component {
  logout() {
    localStorage.removeItem("hubToken");
    window.location.reload();
  }

  render() {
    return (
      <div className="home">
        <h1>This is Home</h1>
        <Button onClick={this.logout}>Log out</Button>
      </div>
    );
  }
}
