/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class WebdevSkills extends Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = () => {
    this.setState({ webdevSkills: this.props.webdevSkills })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ webdevSkills: props.webdevSkills })
  }

  handleChange = (i) => (e) => {
    const {webdevSkills} = this.props;
    webdevSkills[i][e.target.name] = e.target.value;
    this.setState({ webdevSkills }, () => {
      const {webdevSkills} = this.props;
      this.props.update({webdevSkills})
      
    })
  }
  
  render() {
    const {webdevSkills} = this.props;
    return (
      <div className="webdevSkills section">
        <Header sub>
          <span>Web Development skills</span>
          <button className="btn" onClick={e => this.props.pushSkill(e)}><Icon className="green" name="add square"></Icon></button>
        </Header>

        {webdevSkills.map((lang, i) => 
            <div className="single" key={lang.id}>
            { i > 0 ? <button className="btn btn-close-repeat" onClick={e => this.props.removeSkill(i, e)}><Icon className="red large" name="window close" ></Icon></button> : ''}
            <Grid columns={12}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Grid.Row>
                      <Grid.Column >
                        <label>Name </label>
                        <input type="text" name="name" onChange={this.handleChange(i)} value={lang.name}/> 
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="pos-bottom">
                        <label>Level </label>
                        <input type="text" name="level" onChange={(e) => this.props.update(i, e)} value={lang.level}/> 
                      </Grid.Column>
                    </Grid.Row>
                  </Grid.Column>
                  
                  <Grid.Column>
                  <label>Brief description </label>
                    <textarea style={{width:'100%'}} rows="5" type="text" name="desc" onChange={(e) => this.props.update(i, e)} value={lang.company} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
              )}
        </div>
    );

  }
  
}


export default WebdevSkills;