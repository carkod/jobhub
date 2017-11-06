/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class Skills extends Component {
  
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
  /*  if (!!workExpArray) {
      return(
        <div className="workRepeater section">
            <Header sub>
              <span>WORK EXPERIENCE</span>
              <button className="btn" onClick={e => this.props.pushWork(e)}><Icon className="green" name="add square"></Icon></button>
            </Header>

            {workExpArray.map((work, i) => 
                <div className="single" key={work.id}>
                { i > 0 ? <button className="btn btn-close-repeat" onClick={e => this.props.removeWork(i, e)}><Icon className="red large" name="window close" ></Icon></button> : ''}
                <Grid columns={12}>
                    <Grid.Row columns={3}>
                      <Grid.Column >
                        <label>Date </label>
                        <input type="text" name="date" onChange={(e) => this.props.update(i, e) } value={work.date}/> 
                      </Grid.Column>
                      <Grid.Column >
                        <label>Position </label>
                        <input type="text" name="position" onChange={(e) => this.props.update(i, e)} value={work.position}/> 
                      </Grid.Column>
                      <Grid.Column >
                        <label>Company </label>
                        <input type="text" name="company" onChange={(e) => this.props.update(i, e)} value={work.company}/> 
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <div className="block">
                          <label>Description </label>
                          <br />
                          <Editor value={work.desc} update={(e) => this.props.triggerDescChange(i, e)} />
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              
            )}
        </div>
        
        )
    } else {
      <div className="workRepeater">Loading...</div>
    }
  */    
  }
  
}


export default Skills;