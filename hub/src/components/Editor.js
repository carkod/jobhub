/* eslint-disable*/

import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';



class Description extends Component {

    constructor(props){
        super(props);
        this.state = { desc: [] }
        this.triggerChange = this.triggerChange.bind(this);
        this.updateState = this.updateState.bind(this);
        //this.getValue = this.getValue.bind(this);
    }
    
  componentDidMount = () => {
    this.updateState(this.props)
  }
    
  componentWillReceiveProps = (nextProps) => {
    this.updateState(nextProps)
  } 
  
  
  triggerChange = (value) => {
    const desc = value.toString('html')
    //console.log(desc)
    this.props.onChange(desc)
  }
  
  
  updateState = (editorValue) => {
    console.log(editorValue)
    this.setState({ desc: editorValue })
  }
  
  onChange = (value) => {
    
    /*this.setState({
      value
    });
    const currentVal = this.state.value.toString('html');
    const newVal = value.toString('html');
    if (currentVal !== newVal) {
      this.triggerChange(value)
    } */
  };
  
  
  getValue = () => {
    let val = RichTextEditor.createEmptyValue();
    return val;
    
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <RichTextEditor value={this.getValue()} onChange={this.onChange()} />
      </div>
    );
  }
}

export default Description;