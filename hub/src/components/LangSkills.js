/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class LangSkills extends Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = () => {
    this.setState({ langSkills: this.props.langSkills })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ langSkills: props.langSkills })
  }

  pushSkill = (e) => {
    e.preventDefault();
    const {langSkills} = this.state;
    const id = 'langSkill-' + shortid.generate();
    
    const newLang = {
      id: id, 
      name: '', 
      level:'',
      desc: '',
    }
    langSkills.push(newLang)
    this.setState({ langSkills }, () => {
      
      
    });
  }


  handleChange = (i) => (e) => {
    const {langSkills} = this.props;
    langSkills[i][e.target.name] = e.target.value;
    this.setState({ langSkills }, () => {
      
      const {langSkills} = this.props;
      this.props.update({langSkills})
      
    })
  }
  
  render() {
    const {langSkills} = this.props;
    
    return (
      <div className="langSkills section">
        <Header sub>
          <span>Languages</span>
          <button className="btn" onClick={this.pushSkill}><Icon className="green" name="add square"></Icon></button>
        </Header>

        {langSkills.map((lang, i) => 
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
                        <input type="text" name="level" onChange={this.handleChange(i)} value={lang.level}/> 
                      </Grid.Column>
                    </Grid.Row>
                  </Grid.Column>
                  
                  <Grid.Column>
                  <label>Brief description </label>
                    <textarea style={{width:'100%'}} rows="5" type="text" name="desc" onChange={this.handleChange(i)} value={lang.desc} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
              )}
        </div>
    );

  }
  
}


export default LangSkills;