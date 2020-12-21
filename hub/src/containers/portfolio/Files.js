import produce from 'immer';
import moment from 'moment';
import Upload from "../../components/Upload";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Icon } from 'semantic-ui-react';
import shortid from 'shortid';
import { fileNotFound, uploadFileApi, removeFileApi } from '../../actions/files';
import { parseSize } from "../../utils";

class Files extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      active: false,
      loading: false,
    }
  }
  componentDidUpdate = (props) => {

    if (this.props.file !== props.file) {
      this.setState(produce(draft => {
        const file = this.state.file[0];
        draft.file = file
        const newFile = {
          fileId: shortid.generate(),
          fileName : file.name,
          fileSize : parseSize(file.size),
          fileDate : Date.now(),
          fileURL : this.props.file.data,
        }
        this.props.onUpload(newFile);
        this.uploadRef.value = "";
        draft.active = false
      }))
    }
  }

  fileNameChange = (i) => (e) => {
    this.setState(produce(draft => {
      draft.documents[i].name = e.target.value
    }))
  }

  handleChange = (e) => {
    let active = false;
    let file = undefined;
    if (e.target.files.length > 0) {
      file = e.target.files
      active = true;
    }
    this.setState(produce(draft => {
      draft.active = active
      draft.file = file
    }))
  }
  
  handleUpload = e => {
    e.preventDefault();
    if (this.state.file === undefined || this.state.file.length < 1) {
      //handle error no file attached
      this.props.fileNotFound()
    } else {
      let data = new FormData();
      data.append('fieldname', this.state.file[0]);
      this.props.uploadFileApi(data)
    }
  }
  
  deleteDoc = (doc) => (e) => {
    e.preventDefault();
    this.props.removeFileApi(doc).then(x => {
      this.props.onDeupload(doc);
    });
        
    
  }

  handleUploadRef = (ref) => {
    this.uploadRef = ref;
  }
  
  render() {
    return (
      <div className="fileUpload section">
        <Header sub>
          <span>Documents</span>
        </Header>
          
          <Grid padded celled>
            <Grid.Row columns={2} className="headerRow">
              <Grid.Column>
                <Upload 
                  active={this.state.active}
                  loading={this.state.loading}
                  handleChange={this.handleChange}
                  handleUpload={this.handleUpload}
                  forwardedRef={this.handleUploadRef}
                />
              </Grid.Column>
              <Grid.Column>
                Number of files
              </Grid.Column>
            </Grid.Row>
            {this.props.documents && this.props.documents.map((doc, i) => 
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
                  {doc.fileSize + ' KB'}
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

const mapStateToProps = (s, p) => {
  const { snackBarReducer, filesReducer } = s;
  return {
    active: snackBarReducer.loading ? false : true,
    loading: snackBarReducer.loading,
    file: filesReducer,
    documents: p.documents
  }
}


export default connect(mapStateToProps, { fileNotFound, uploadFileApi, removeFileApi })(Files);