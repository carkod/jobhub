/* eslint-disable*/
import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import { Icon, Button, Header, Input } from 'semantic-ui-react';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:RichTextEditor.createEmptyValue(),
      focus: false,
    };
  }
  
  componentWillReceiveProps = (props) => {
      const value = RichTextEditor.createValueFromString(props.value.toString('html'), 'html');
      this.setState({ value: value })   
  }

  handleChange = (e) => {
    this.setState({ value: e });
  }
 
  render() {
    return (
      <div className="section">
        <Header sub>
          <span>Description</span>
        </Header>
        <RichTextEditor value={this.state.value} onChange={this.handleChange} onBlur={() => this.props.onChange(this.state.value.toString('html'))}/>
      </div>
    );  
    }
}

export default Editor;
