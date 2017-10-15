/* eslint-disable*/

import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';



class Description extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: this.props.value ? RichTextEditor.createValueFromString(this.props.value, 'html') : RichTextEditor.createEmptyValue()
        }
        this.triggerChange = this.triggerChange.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    
    
  componentWillReceiveProps = (nextProps) => {
    const value = RichTextEditor.createValueFromString(nextProps.value, 'html');
    this.setState({
      value: value,
    })
  }  
  
  triggerChange = () => {
      this.props.onChange(this.state.value.toString('html'))
  }
  
  onChange = (value) => {
    
    const currentVal = this.state.value.getEditorState().getCurrentContent();
    const newVal = value.getEditorState().getCurrentContent();
    
    this.setState({value});
      
    if (currentVal !== newVal) {
      this.triggerChange
    } 
    
  };
  
  render () {
    console.log(this.state)
    return (
      <RichTextEditor value={this.state.value} onChange={this.onChange} />
    );
  }
}

export default Description;