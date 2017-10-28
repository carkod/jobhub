/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';
import Description from './Editor';
import RichTextEditor from 'react-rte';
class WorkRepeater extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.getValue = this.getValue.bind(this);
  }

  componentDidMount = () => {
    this.setState({ workExp: this.props.workExp })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ workExp: props.workExp })
  }


  getValue = (work, i) => {
    const workExp = this.state.workExp;
    if (this.state.workExp) {
      console.log(workExp)  
    } 
    
    //this.setState({ desc: this.props.workExp.desc })
    //const editorValue = this.state.workExp.desc;
    //const editorValue = RichTextEditor.createEmptyValue();
    const editorValue = work === undefined ? RichTextEditor.createEmptyValue() : RichTextEditor.createValueFromString(work.toString('html'), 'html');
    //console.log(editorValue)    
    return editorValue;
  }
  
  onChange = (e, i) => {
    //console.log(value)
    const currValue = this.state.workExp[i].desc;
    const newValue = RichTextEditor.createValueFromString(currValue, 'html');
    const newObj = Object.assign(this.state.workExp[i], {
      
    })
    
    //this.setState({ value })
    console.log(newValue);
    //this.getValue(e);
  }
 
  render() {
    const workExpArray = this.props.workExp;
    console.log(this.state)
      return(
        <div className="workRepeater">
            <Button className="icon large" onClick={e => this.props.pushWork(e)}><Icon className="green" name="add square"></Icon></Button>
            {workExpArray.map((work, i) => 
                <div className="item" key={work.id}>
                { i > 0 ? <Button onClick={e => this.props.removeWork(i, e)} icon inverted><Icon className="red" name="window close" ></Icon></Button> : ''}
                    
                    <Form.Field>
                    <label>Date</label>
                    <input type="text" name="date" onChange={(e) => this.props.update(i, e) } value={work.date}/> 
                    
                    <label>Position</label>
                    <input type="text" name="position" onChange={(e) => this.props.update(i, e)} value={work.position}/> 
                    
                    </Form.Field>
                    
                    <label>Description</label>
                    <RichTextEditor name="desc" value={this.getValue(work.desc, i)} /*onChange={e => this.props.descUpdate(i, e)}*/ onChange={e => this.onChange(e, i)} />
                    
                    {/*<Description editorId={work.id} value={work.desc} onChange={ e  => this.props.descUpdate(i, e) } />*/}

                    
                </div>
            )}
        </div>
        )
  }
}

export default WorkRepeater;