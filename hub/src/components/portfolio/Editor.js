/* eslint-disable*/
import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

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
      console.log(value)
      this.setState({ value: value })   
  }

  handleChange = (e) => {
      this.setState({ value: e });
      
      /*const currentVal = value.getEditorState().getCurrentContent();
      const newVal = e.getEditorState().getCurrentContent();*/
      /*if (currentVal !== newVal && !this.state.focus) {
        this.props.update(e)
      }*/ 
  }
 
  render() {
    //console.log(this.state)
    return (
        <RichTextEditor value={this.state.value} onChange={this.handleChange} onBlur={() => this.props.onChange(this.state.value.toString('html'))}/>
    );  
    }
}

export default Editor;
