/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

class WorkRepeater extends Component {
  
  state = {
    workExp: [
      {
        id: 'workExp-0'
      }
    ]
    
  }
  
  onChange = (index) => (e) => {
    
    this.props.update(index, e)
    this.state.workExp[index][e.target.name] = e.target.value
    this.setState({ workExp: this.state.workExp })
    
  }
  
  pushWork = (e) => {
    e.preventDefault();
    const workID = 'workExp-' + shortid.generate();
    
    this.state.workExp.push({ id: workID })
    this.setState({ workExp: this.state.workExp });
  }
  
  removeWork = (index) => (e) => {
    e.preventDefault();
    const findIndex = this.state.workExp[index];
    
    this.state.workExp.splice(index,1)
    this.setState({ workExp: this.state.workExp });	
  }
  
  componentDidUpdate = () => {
    const workExp = this.state.workExp
    this.props.update({ workExp })
  }
  
  render() {
      return(
        <div className="workRepeater">
            <Button className="icon large" onClick={this.pushWork}><Icon className="green" name="add square"></Icon></Button>
            {this.state.workExp.map((work, i) => 
                <div className="item" key={work.id}>
                { i > 0 ? <Button onClick={this.removeWork(i)} icon inverted><Icon className="red" name="window close" ></Icon></Button> : ''}
                    
                    <label>Date</label>
                    <input type="text" name="date" onChange={this.onChange(i)} value={this.state.workExp[i].date || ''} /> 
                    
                    <label>Position</label>
                    <input type="text" name="position" onChange={this.onChange(i)} value={this.state.workExp[i].position || ''} /> 
                    
                </div>
            )}
        </div>
        )
  }
}

let mapStateToProps = () => {
  
}

export default connect()(WorkRepeater);