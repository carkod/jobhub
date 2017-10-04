/* eslint-disable*/

import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';



class Description extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: RichTextEditor.createEmptyValue()        
        }
        this.triggerChange = this.triggerChange.bind(this)
    }
    
    
  triggerChange = () => {
      this.props.onChange(this.state.value.toString('html'))
  }
  
  onChange = (value) => {
    
    clearTimeout(this.timeout);
    this.setState({value});
    //setTimeout(this.props.onChange(this.state.value.toString('html')), 1000);
    this.timeout = setTimeout(this.triggerChange, 1000);
  };
  
  render () {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default Description;