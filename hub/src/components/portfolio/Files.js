/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon, Label } from 'semantic-ui-react';
import { uploadFile } from '../../actions/project';
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


  handleChange = (e) => {
    console.log(this.state)
    const {documents} = this.state;
    let data = new FormData(),
        fileMeta;
    data.append('fieldname', e.target.files[0]);
    uploadFile(data).then(file => {
      console.log(file)
      documents.file.name = file.fieldname;
      documents.file.size = file.size;
      documents.file.url = file.url;
      this.setState({ documents })  
    });
    
  }

  
  render() {
    console.log(this.state)
    const {documents} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div className="fileUpload section">
        <Header sub>
          <span>IT skills</span>
          <button className="btn" onClick={this.pushSkill}><Icon className="green" name="add square"></Icon></button>
        </Header>
          <Form.Field>
            <Label htmlFor="filaname">Enter name/description for the file</Label>
            <Input name="filename" type="text" id="filename" />
          </Form.Field>
          <Form.Field>
            <Label htmlFor="documents">Upload file</Label>
            <Input name="fieldname" type="file" id="input" onChange={this.handleChange}
            ref={fieldname => {this.handleFiles = fieldname}} />
          </Form.Field>
        <Button name="append" type="submit" onClick={this.handleSubmit} >Append</Button>
      </div>
    );

  }
  
}


export default Files;