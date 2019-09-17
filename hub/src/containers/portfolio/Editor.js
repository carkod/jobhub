/* eslint-disable*/
import React, { Component } from 'react';
import { Icon, Button, Header, Input } from 'semantic-ui-react';
import Editor from '../../components/Editor';

class Editor extends Component {
  constructor(props) {
    super(props);

  }

  handleChange = (e) => {
    this.props.onChange(e.toString('html'))
  }

  render() {
    return (
      <div className="section">
        <Header sub>DESCRIPTION</Header>
        <Editor value={this.state.value} onChange={this.handleChange} />
        {/* <RichTextEditor value={this.state.value} onChange={this.handleChange} onBlur={() => this.props.onChange(this.state.value.toString('html'))}/> */}
      </div>
    );
  }
}

export default Editor;
