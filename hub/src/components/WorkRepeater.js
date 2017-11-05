/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class WorkRepeater extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    
  }

  componentDidMount = () => {
    this.setState({ workExp: this.props.workExp })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ workExp: props.workExp })
  }


  
  render() {
    const workExpArray = this.props.workExp;
    if (!!workExpArray) {
      return(
        <div className="workRepeater">
            <Button className="icon large" onClick={e => this.props.pushWork(e)}><Icon className="green" name="add square"></Icon> Add Work Experience</Button>
            {workExpArray.map((work, i) => 
                <div className="item module" key={work.id}>
                { i > 0 ? <Button className="block" onClick={e => this.props.removeWork(i, e)} icon inverted><Icon className="red" name="window close" ></Icon></Button> : ''}
                    <div className="">
                    <Form.Field>
                      <label>Date </label>
                      <input type="text" name="date" onChange={(e) => this.props.update(i, e) } value={work.date}/> 
                      
                      <label>Position </label>
                      <input type="text" name="position" onChange={(e) => this.props.update(i, e)} value={work.position}/> 
                    
                      <label>Company </label>
                      <input type="text" name="company" onChange={(e) => this.props.update(i, e)} value={work.company}/> 
                      
                    </Form.Field>
                    
                    <div className="block">
                      <label>Description </label>
                      <br />
                      <Editor value={work.desc} update={(e) => this.props.triggerDescChange(i, e)} />
                    </div>
                    </div>
                </div>
            )}
        </div>
        )
    } else {
      <div className="workRepeater">Loading...</div>
    }
      
  }
}

export default WorkRepeater;