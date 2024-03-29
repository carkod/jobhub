/* eslint-disable */

import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

class HtmlText extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate = (props) => {
    if (this.props.text) {
      const { text } = props;
    }
  };

  render() {
    return (
      <div className="rte-text">
        {ReactHtmlParser(this.props.text)}
      </div>
    );
  }
}

export default HtmlText;
