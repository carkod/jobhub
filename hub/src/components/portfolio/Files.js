/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon, Label, Table } from 'semantic-ui-react';
import { uploadFile, removeFile } from '../../actions/project';
import Editor from './Editor';
import RichTextEditor from 'react-rte';
import moment from 'moment';

class Files extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents,
      uploading: false,
    }
  }

  componentDidMount = () => {
    this.setState({ documents: this.props.documents })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ documents: props.documents })
  }

  fileNameChange = (i) => (e) => {
    const {documents} = this.state;
    documents[i].fileName = e.target.value;
    this.setState({documents})
  }

  handleChange = (e) => {
    let data = new FormData();
    data.append('fieldname', e.target.files[0] );
    this.data = data;
    
  }
  
  handleUpload = () => {
    const {documents} = this.state;
    const data = this.data;
    const parseSize = (bytes) => parseFloat(Math.round(bytes/1024)).toFixed(2) + ' KB';

    if (this.fieldname === undefined) {
      //handle error no file uploaded
      return false;
    } else {
      //Pushing new file to array
    this.setState({ uploading:true }); 
    
    uploadFile(data).then(file => {
      const newFile = {
        fileId: shortid.generate(),
        fileName : file.fieldname,
        fileSize : parseSize(file.size),
        fileDate : Date.now(),
        fileURL : file.url,
        fileRawName : file.originalname,
        fileDir: file.destination
      }
      documents.push(newFile);
      
      this.setState({ documents, uploading:false }, () => {
        this.props.onUpload({documents});
      });
      
    });
    }
    
  }
  
  deleteDoc = (doc) => (e) => {
    e.preventDefault();
    const {documents} = this.state;
    
    removeFile(doc)
      .then(file => {
        const i = documents.findIndex(x => x.fileId === doc.fileId)
        documents.splice(i,1);
        this.setState({ documents });
        this.props.onDeupload({documents});
    })
    
  }
  
  render() {
    const {documents} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div className="fileUpload section">
        <Header sub>
          <span>Documents</span>
        </Header>
          
          <Grid padded celled>
            <Grid.Row columns={2} className="headerRow">
              <Grid.Column>
                <input name='files' type="file" id="input" onChange={this.handleChange} ref={fieldname => {this.handleFiles = fieldname}} />
                <button className="btn btn-upload" name="append" type="submit" onClick={this.handleUpload} disabled={this.state.uploading}>
                  {this.state.uploading ? <Icon loading name="file archive outline" className="white" /> : <Icon name="upload" className="white" />}
                </button>
              </Grid.Column>
              <Grid.Column>
                Number of files
              </Grid.Column>
            </Grid.Row>
            {documents.map((doc, i) => 
              <Grid.Row columns={4} key={doc.fileId}>
                <Grid.Column textAlign="center" width={4}>
                  <button className="btn" onClick={this.deleteDoc(doc)}><Icon name="delete" className="red large"/></button>
                </Grid.Column>
                <Grid.Column width={4}>
                  <input id="fileName" value={doc.fileName} onChange={this.fileNameChange(i)}/>
                </Grid.Column>
                <Grid.Column width={4}>
                  {moment(doc.fileDate).format('D-M-Y')}
                </Grid.Column>
                <Grid.Column textAlign="right" width={4}>
                  {doc.fileSize}
                </Grid.Column>
                <Grid.Column width={16} className="borderTopDashed">
                  <a href={doc.fileURL} title="download">{doc.fileURL}</a>
                </Grid.Column>
              </Grid.Row>
            )}
            
          </Grid>
          
      </div>
    );

  }
  
}


export default Files;