/* eslint-disable*/
import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createEmptyValue(),
      focus: false,
    };
  }

  
  componentWillReceiveProps = (props) => {
    console.log(props)
      const value = RichTextEditor.createValueFromString(props.value.toString('html'), 'html');
      this.setState({ value: value })   
  }

  onChange = (e) => {
      const {value} = this.state;
      this.setState({ value: e });
      
      const currentVal = value.getEditorState().getCurrentContent();
      const newVal = e.getEditorState().getCurrentContent();
      
      /*if (currentVal !== newVal && !this.state.focus) {
        this.props.update(e)
      }*/ 
  }
 
  render() {
    console.log(RichTextEditor.createValueFromString(this.state.value.toString('html'), 'html'))
    return (
        <RichTextEditor value={this.state.value} onChange={this.onChange} onBlur={() => this.props.onChange(this.state.value)}/>
    );  
    }
}

export default Editor;
