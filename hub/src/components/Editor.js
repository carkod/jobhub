/* eslint-disable*/

import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';



class Description extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: RichTextEditor.createEmptyValue()
        }
        this.triggerChange = this.triggerChange.bind(this);
        this.updateState = this.updateState.bind(this);
        //this.getValue = this.getValue.bind(this);
    }
    
  componentDidMount = () => {
    this.updateState(this.props)
  }
    
  componentWillReceiveProps = (nextProps) => {
    this.updateState(nextProps.value)
  } 
  
  
  triggerChange = (value) => {
    const desc = value.toString('html')
    //console.log(desc)
    this.props.onChange(desc)
  }
  
  
  updateState = (editorValue) => {
    this.setState({ editorValue })
  }
  
  onChange = (value) => {
    
    this.setState({value});
    const currentVal = this.state.value.toString('html');
    const newVal = value.toString('html');
    if (currentVal !== newVal) {
      this.triggerChange(value)
    } 
  };
  
  
  getValue = () => {
    //let val = this.state.value.toString('html');
    let val = this.state.value;
    if (!val) {
      val = RichTextEditor.createEmptyValue();
    }
    return val;
  }

  render () {
    //console.log(this.state.value)
    return (
      <RichTextEditor value={this.getValue()} onChange={this.onChange} />
    );
  }
}

export default Description;