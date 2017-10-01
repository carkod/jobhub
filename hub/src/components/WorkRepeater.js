/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';

class WorkRepeater extends Component {
  
  state = {
    //workExp: this.props.workExp || [{id: 'workExp-0', date:'', position:''}],
  }
  
  
  removeWork = (index) => (e) => {
    
  }
  

  render() {
    const workExpArray = this.props.workExp;
      return(
        <div className="workRepeater">
            <Button className="icon large" onClick={e => this.props.pushWork(e)}><Icon className="green" name="add square"></Icon></Button>
            {workExpArray.map((work, i) => 
                <div className="item" key={work.id}>
                { i > 0 ? <Button onClick={e => this.props.removeWork(i, e)} icon inverted><Icon className="red" name="window close" ></Icon></Button> : ''}
                    
                    <label>Date</label>
                    <input type="text" name="date" onChange={(e) => this.props.update(i, e) } value={work.date}/> 
                    
                    <label>Position</label>
                    <input type="text" name="position" onChange={(e) => this.props.update(i, e)} value={work.position}/> 
                    
                </div>
            )}
        </div>
        )
  }
}

export default WorkRepeater;