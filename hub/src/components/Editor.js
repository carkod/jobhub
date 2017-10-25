/* eslint-disable*/

import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';



class Description extends Component {

    constructor(props){
        super(props);
        this.state = {}
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
    //console.log(editorValue)
    const arrState = new Array().slice();
    arrState.concat([editorValue])
    //this.state.push({editorValue})
    this.setState({ arr: arrState })
  }
  
  onChange = (value) => {
    
    this.setState({
      value
    });
    const currentVal = this.state.value.toString('html');
    const newVal = value.toString('html');
    if (currentVal !== newVal) {
      this.triggerChange(value)
    } 
  };
  
  
  getValue = () => {
    //let val = this.state.value.toString('html');
    let val = this.props.value;
    if (!val) {
      val = RichTextEditor.createEmptyValue();
    }
    return val;
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <RichTextEditor value={this.getValue()} onChange={this.onChange()} />
      </div>
    );
  }
}

export default Description;