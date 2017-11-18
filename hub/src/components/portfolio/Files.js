/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon, Label } from 'semantic-ui-react';
import { fetchCVs } from '../../actions/cv';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class Files extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents
    }
  }

  componentDidMount = () => {
    this.setState({ documents: this.props.documents })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ documents: props.documents })
  }


  handleFiles = (e) => {
    const {documents} = this.state;
    this.setState({ [e.target.name]: e.target.name })
    //this.props.onChange(doc)
    
  }
  
  handleSubmit = () => {
    const {documents} = this.state;
    console.log(documents)
    //this.props.onChange(documents);
  }
  
  render() {
    console.log(this.state)
    const {documents} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div className="documents section">
        <Header sub>
          <span>IT skills</span>
          <button className="btn" onClick={this.pushSkill}><Icon className="green" name="add square"></Icon></button>
        </Header>
          <Form.Field>
            <Label htmlFor="filaname">Enter name/description for the file</Label>
            <Input name="filename" type="text" id="filename" onChange={this.handleFiles} />
          </Form.Field>
          <Form.Field>
            <Label htmlFor="documents">Upload file</Label>
            <Input name="file" type="file" id="input" onChange={this.handleFiles} onClick={this.value = null} />
          </Form.Field>
        <Button name="append" type="submit" onClick={this.handleSubmit}>Append</Button>
      </div>
    );

  }
  
}


export default Files;