/* eslint-disable*/
import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createEmptyValue(),
      focus: false,
    };
  }

  componentDidMount = () => {
    const value = RichTextEditor.createValueFromString(this.props.value.toString('html'), 'html');
    this.setState({ value: value })
  }


  componentDidUpdate = (props) => {
    if (this.props.value !== props.value) {
      const value = RichTextEditor.createValueFromString(this.props.value.toString('html'), 'html');
      this.setState({ value: value })
    }
    
  }

  onChange = (e) => {
    const { value } = this.state;
    this.setState({ value: e });
  }

  render() {
    return (
      <RichTextEditor value={this.state.value} onChange={this.onChange} onBlur={() => this.props.onChange(this.state.value)} className="editor__minHeight"/>
    );
  }
}
