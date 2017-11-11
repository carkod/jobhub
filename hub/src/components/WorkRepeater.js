/* eslint-disable */

import React, { Component } from 'react';

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
  

  pushExp = (e) => {
    e.preventDefault();
    const {workExp} = this.state;
    const id = 'langSkill-' + shortid.generate();
    const newExp = {
      id: id, 
      name: '', 
      level:'',
      desc: '',
    }
    workExp.push(newExp)
    this.setState({ workExp });
  }
  
  removeExp = (i) => (e) => {
    e.preventDefault();
    const {workExp} = this.state;
    workExp.splice(i,1)
    this.setState({ workExp })
  }
  
  descChange = (i) => (e) => {
    console.log(e.toString('html'))
    console.log('editor update triggered')
    const {workExp} = this.state;
    workExp[i].desc = e;
    this.setState({workExp});
    /*setTimeout(() => {
      this.props.update({workExp});
    }
    , 2000);  */
  }


  handleChange = (i) => (e) => {
    const {workExp} = this.state;
    workExp[i][e.target.name] = e.target.value;
    this.setState({ workExp })
    this.timeout = setTimeout(() => this.props.update({workExp}), 1000)    
  }
  
  render() {
    const {workExp} = !!Object.keys(this.state).length ? this.state : this.props;
    //console.log(this.state)
      return(
        <div className="workRepeater section">
            <Header sub>
              <span>WORK EXPERIENCE</span>
              <button className="btn" onClick={this.pushExp}><Icon className="green" name="add square"></Icon></button>
            </Header>

            {workExp.map((work, i) => 
                <div className="single" key={work.id}>
                { i > 0 ? <button className="btn btn-close-repeat" onClick={this.removeExp(i)}><Icon className="red large" name="window close" ></Icon></button> : ''}
                <Grid columns={12}>
                    <Grid.Row columns={3}>
                      <Grid.Column >
                        <label>Date </label>
                        <input type="text" name="date" onChange={this.handleChange(i)} value={work.date}/> 
                      </Grid.Column>
                      <Grid.Column >
                        <label>Position </label>
                        <input type="text" name="position" onChange={this.handleChange(i)} value={work.position}/> 
                      </Grid.Column>
                      <Grid.Column >
                        <label>Company </label>
                        <input type="text" name="company" onChange={this.handleChange(i)} value={work.company}/> 
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <div className="block">
                          <label>Description </label>
                          <br />
                          <Editor value={work.desc} update={this.descChange(i)} />
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

export default WorkRepeater;