/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions/cv';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class ItSkills extends Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = () => {
    this.setState({ itSkills: this.props.itSkills })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ itSkills: props.itSkills })
  }

  pushSkill = (e) => {
    e.preventDefault();
    const {itSkills} = this.state;
    const id = 'itSkill-' + shortid.generate();
    const newLang = {
      id: id, 
      name: '', 
      level:'',
      desc: '',
    }
    itSkills.push(newLang)
    this.setState({ itSkills });
  }
  
  removeSkill = (i) => (e) => {
    e.preventDefault();
    const {itSkills} = this.state;
    itSkills.splice(i,1)
    this.setState({ itSkills })
  }


  handleChange = (i) => (e) => {
    const {itSkills} = this.state;
    itSkills[i][e.target.name] = e.target.value;
    this.setState({ itSkills })
    this.timeout = setTimeout(() => this.props.update({itSkills}), 1000)    
  }
  
  render() {
    const {itSkills} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div className="itSkills section">
        <Header sub>
          <span>IT skills</span>
          <button className="btn" onClick={this.pushSkill}><Icon className="green" name="add square"></Icon></button>
        </Header>

        {itSkills.map((it, i) => 
            <div className="single" key={it.id}>
            { i > 0 ? <button className="btn btn-close-repeat" onClick={this.removeSkill(i)}><Icon className="red large" name="window close" ></Icon></button> : ''}
            <Grid columns={12}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Grid.Row>
                      <Grid.Column >
                        <label>Name </label>
                        <input type="text" name="name" onChange={this.handleChange(i)} value={it.name}/> 
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className="pos-bottom">
                        <label>Level </label>
                        <input type="text" name="level" onChange={this.handleChange(i)} value={it.level}/> 
                      </Grid.Column>
                    </Grid.Row>
                  </Grid.Column>
                  
                  <Grid.Column>
                  <label>Brief description </label>
                    <textarea style={{width:'100%'}} rows="5" type="text" name="desc" onChange={this.handleChange(i)} value={it.desc} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
              )}
        </div>
    );

  }
  
}


export default ItSkills;