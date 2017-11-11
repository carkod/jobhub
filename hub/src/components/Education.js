/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { fetchCVs } from '../actions';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class Education extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    
  }

  componentDidMount = () => {
    this.setState({ educ: this.props.educ })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ educ: props.educ })
  }
  

  pushExp = (e) => {
    e.preventDefault();
    const {educ} = this.state;
    const id = 'langSkill-' + shortid.generate();
    const newExp = {
      id: id, 
      date: '', 
      diploma:'',
      institution:'',
      desc: '',
    }
    educ.push(newExp)
    this.setState({ educ });
  }
  
  removeExp = (i) => (e) => {
    e.preventDefault();
    const {educ} = this.state;
    educ.splice(i,1)
    this.setState({ educ })
  }
  
  descChange = (i) => (e) => {
    const {educ} = this.state;
    educ[i].desc = e.toString('html');
    this.setState({educ});
    this.props.update({educ});
  }


  handleChange = (i) => (e) => {
    const {educ} = this.state;
    educ[i][e.target.name] = e.target.value;
    this.setState({ educ })
    this.timeout = setTimeout(() => this.props.update({educ}), 1000)    
  }
  
  render() {
    const {educ} = !!Object.keys(this.state).length ? this.state : this.props;
      return(
        <div className="courseRepeater section">
            <Header sub>
              <span>EDUCATION</span>
              <button className="btn" onClick={this.pushExp}><Icon className="green" name="add square"></Icon></button>
            </Header>

            {educ.map((course, i) => 
                <div className="single" key={course.id}>
                { i > 0 ? <button className="btn btn-close-repeat" onClick={this.removeExp(i)}><Icon className="red large" name="window close" ></Icon></button> : ''}
                <Grid columns={12}>
                    <Grid.Row columns={3}>
                      <Grid.Column >
                        <label>Date </label>
                        <input type="text" name="date" onChange={this.handleChange(i)} value={course.date}/> 
                      </Grid.Column>
                      <Grid.Column >
                        <label>Certificate/Degree </label>
                        <input type="text" name="diploma" onChange={this.handleChange(i)} value={course.diploma}/> 
                      </Grid.Column>
                      <Grid.Column >
                        <label>Institution </label>
                        <input type="text" name="institution" onChange={this.handleChange(i)} value={course.institution}/> 
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <div className="block">
                          <label>Description </label>
                          <br />
                          <Editor value={course.desc} onChange={this.descChange(i)} />
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              
            )}
        </div>
        
        )
      
  }
}

export default Education;