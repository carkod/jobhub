/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

class WorkRepeater extends Component {
  
  state = {
    //workExp: this.props.workExp || [{id: 'workExp-0', date:'', position:''}],
  }
  
  /*componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    const workExp = nextProps.workExp;
    
    this.setState({ workExp });
  }*/

  
  /*onChange = (i) => (e) => {
    
    this.props.update(i, e)
    const workExp = Object.assign({}, this.state.workExp[i], {
      [e.target.name]: e.target.value 
    });
    const matchObj = this.state.workExp.id.find
    console.log(workExp)
    
    this.setState({
       
    })
    
  }*/
  
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
  
  /*componentDidUpdate = () => {
    const workExp = this.state.workExp
    this.props.update({ workExp })
  }*/
  
  render() {
    const workExpArray = this.state.workExp || this.props.workExp;
      return(
        <div className="workRepeater">
            <Button className="icon large" onClick={this.pushWork}><Icon className="green" name="add square"></Icon></Button>
            {workExpArray.map((work, i) => 
                <div className="item" key={work.id}>
                { i > 0 ? <Button onClick={this.removeWork(i)} icon inverted><Icon className="red" name="window close" ></Icon></Button> : ''}
                    
                    <label>Date</label>
                    <input type="text" name="date" onChange={this.onChange(i)} value={this.state.workExp[i].date} /> 
                    
                    <label>Position</label>
                    <input type="text" name="position" onChange={this.onChange(i)} value={work.position} /> 
                    
                </div>
            )}
        </div>
        )
  }
}

let mapStateToProps = () => {
  
}

export default connect()(WorkRepeater);