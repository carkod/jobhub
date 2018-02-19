/* eslint-disable */

import React, { Component } from 'react';
import shortid from 'shortid';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon, Label, Table } from 'semantic-ui-react';
import { uploadFile, removeFile, addNotification } from '../../actions/project';
import moment from 'moment';

class PrevImage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      image: props,
      uploading: false,
    }
  }

  componentDidMount = () => {
    this.setState({ image: this.props.image })
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ image: props.image })
  }

  fileNameChange = (i) => (e) => {
    const {image} = this.state;
    image[i].fileName = e.target.value;
    this.setState({image})
  }

  handleChange = (e) => {
    let data = new FormData();
    data.append('fieldname', e.target.files[0]);
    this.data = data;
  }
  
  handleUpload = e => {
    e.preventDefault();
    const {image} = this.state;
    const data = this.data;
    
    if (this.fieldname === undefined || this.fieldname.files.length < 1) {
      
      addNotification({type: 'NO_FILE'})
      //handle error no file uploaded
    } else {
      console.log('file found')
      //Loading icon
    this.setState({ uploading:true }); 
    
    uploadFile(data)
    .then(file => {
      addNotification({type: 'UPLODED_FILE'})
      const newFile = {
        imageId: shortid.generate(),
        imageName : file.fieldname,
        imageDate : Date.now(),
        imageURL : file.url,
        imageRawName : file.originalname,
        imageDir: file.destination
      }
    
      this.setState({ image: newFile, uploading:false }, () => {
        this.props.onUpload(this.state);
      });
      
    })
    }
    
  }
  
  
  render() {
    const {image} = !!Object.keys(this.state).length ? this.state : this.props;
    console.log(this.state)
    return (
      <div className="fileUpload section">
        <Header sub>
          <span>Preview Image</span>
        </Header>
          
          <Grid padded celled>
            <Grid.Row columns={2} className="headerRow">
              <Grid.Column>
                <button className="btn btn-upload" name="append" onClick={this.handleUpload} disabled={this.state.uploading}>
                  {this.state.uploading ? <Icon loading name="file archive outline" className="white" /> : <Icon name="upload" className="white" />}
                </button>
                <input name="files" type="file" id="input" onChange={this.handleChange} ref={fieldname => {this.fieldname = fieldname}} />
              </Grid.Column>
              <Grid.Column>
                <a href={image.imageURL} target="_blank">{image.imageRawName}</a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          
      </div>
    );

  }
  
}


export default PrevImage;