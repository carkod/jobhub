/* eslint-disable*/

import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';



class Description extends Component {

    constructor(props){
        super(props);
        /*this.state = {
            value: this.props.value ? RichTextEditor.createValueFromString(this.props.value, 'html') : RichTextEditor.createEmptyValue()
        }
        this.triggerChange = this.triggerChange.bind(this)
        this.onChange = this.onChange.bind(this)*/
    }
    
  
  /*triggerChange = () => {
      this.props.onChange(this.state.value.toString('html'))
  }*/
  
  /*onChange = (value) => {
    
    const currentVal = this.state.value.getEditorState().getCurrentContent();
    const newVal = value.getEditorState().getCurrentContent();
    
    this.setState({value});
      
    if (currentVal !== newVal) {
      this.triggerChange
    } 
    
  };*/
  
  descUpdate = (value) => {
    const desc = { [this.props.name]: this.props.value }
    this.props.onChange({desc})
  }
  
  render () {
    console.log(this.props)
    return (
      <RichTextEditor value={this.props.value} onChange={this.descUpdate} />
    );
  }
}

export default Description;