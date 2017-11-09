/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class ItSkills extends Component {
  
  constructor(props) {
    super(props);
    this.state = {}
    //console.log(props)
  }

  componentDidMount = () => {
    this.setState({ itSkills: this.props.itSkills })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ itSkills: props.itSkills })
  }

  handleChange = (i) => (e) => {
    const {itSkills} = this.props;
    itSkills[i][e.target.name] = e.target.value;
    this.setState({ itSkills }, () => {
      const {itSkills} = this.props;
      this.props.update({itSkills})
      
    })
  }
  
  render() {
    const {itSkills} = this.props;
    return (
      <div className="itSkills section">
        <Header sub>
          <span>IT skills</span>
          <button className="btn" onClick={e => this.props.pushlang(e)}><Icon className="green" name="add square"></Icon></button>
        </Header>

        {itSkills.map((lang, i) => 
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


export default ItSkills;