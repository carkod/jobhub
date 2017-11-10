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
    this.state = {};
  }

  componentDidMount = () => {
    this.setState({ webdevSkills: this.props.webdevSkills })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ webdevSkills: props.webdevSkills })
  }

  pushSkill = (e) => {
    e.preventDefault();
    const {webdevSkills} = this.state;
    const id = 'webdevSkill-' + shortid.generate();
    const newLang = {
      id: id, 
      name: '', 
      level:'',
      desc: '',
    }
    webdevSkills.push(newLang)
    this.setState({ webdevSkills });
  }
  
  removeSkill = (i) => (e) => {
    e.preventDefault();
    const {webdevSkills} = this.state;
    webdevSkills.splice(i,1)
    this.setState({ webdevSkills })
  }


  handleChange = (i) => (e) => {
    const {webdevSkills} = this.state;
    webdevSkills[i][e.target.name] = e.target.value;
    this.setState({ webdevSkills })
    this.timeout = setTimeout(() => this.props.update({webdevSkills}), 1000)    
  }
  
  render() {
    const {webdevSkills} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div className="webdevSkills section">
        <Header sub>
          <span>Web Development skills</span>
          <button className="btn" onClick={this.pushSkill}><Icon className="green" name="add square"></Icon></button>
        </Header>

        {webdevSkills.map((webdev, i) => 
            <div className="single" key={webdev.id}>
            { i > 0 ? <button className="btn btn-close-repeat" onClick={this.removeSkill(i)}><Icon className="red large" name="window close" ></Icon></button> : ''}
            <Grid columns={12}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Grid.Row>
                      <Grid.Column >
                        <label>Name </label>
                        <input type="text" name="name" onChange={this.handleChange(i)} value={webdev.name}/> 
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="pos-bottom">
                        <label>Level </label>
                        <input type="text" name="level" onChange={this.handleChange(i)} value={webdev.level}/> 
                      </Grid.Column>
                    </Grid.Row>
                  </Grid.Column>
                  
                  <Grid.Column>
                  <label>Brief description </label>
                    <textarea style={{width:'100%'}} rows="5" type="text" name="desc" onChange={this.handleChange(i)} value={webdev.company} />
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