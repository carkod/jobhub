/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';
import Description from './Editor';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import RichTextEditor from 'react-rte';
class WorkRepeater extends Component {
  
  constructor(props) {
    super(props);
    this.getValue = this.getValue.bind(this);
  }
  
  onChange = (e) => {
    console.log(e._editorState.getCurrentContent())
  }
  
  getValue = (work) => {
    const {desc} = work;
    
    //const editorValue = RichTextEditor.createValueFromString(desc.json(), 'html')
    //const editorValue = RichTextEditor.createEmptyValue();
    const editorValue = desc !== 'undefined' ? RichTextEditor.createValueFromString(desc.toString('html'), 'html') : RichTextEditor.createEmptyValue() ;
    //const editorValue = desc !== 'undefined' ?
    //const editorValue = EditorState.createWithContent(convertFromRaw(desc));
    return editorValue;
  }
 
  render() {
    const workExpArray = this.props.workExp;
    console.log(workExpArray)
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
                    <RichTextEditor name="desc" value={this.getValue(work)} onChange={this.onChange} />
                    
                    {/*<Description key={work.id} editorId={work.id} value={work.desc} onChange={ desc  => this.props.descUpdate(desc, i) } />*/}

                    
                </div>
            )}
        </div>
        )
  }
}

export default WorkRepeater;