import Upload from "../../components/Upload";
import React, { Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import shortid from 'shortid';
import { fileNotFound, removeFileApi, uploadFileApi } from '../../actions/files';
import { parseSize } from "../../utils";
import { connect } from "react-redux";
import produce from "immer";

class PrevImage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      active: false,
      loading: false,
    }
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
      this.props.uploadFileApi(data).then(x => {
        this.setState(produce(draft => {
          const file = this.state.file[0];
          draft.file = file
          const newFile = {
            fileId: shortid.generate(),
            fileName : file.name,
            fileSize : parseSize(file.size),
            fileDate : Date.now(),
            fileURL : x.payload.data,
          }
          this.props.onUpload(newFile);
          this.uploadRef.value = "";
          draft.active = false
        }))
      })
    }
  }

  handleUploadRef = (ref) => {
    this.uploadRef = ref;
  }
  
  
  render() {
    return (
      <div className="fileUpload section">
        <Header sub>
          <span>Preview Image</span>
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
                <a href={this.props.file.fileURL} target="_blank">
                  <img src={this.props.file.fileURL} style={{"maxWidth": "100%"}}/>
                  <span>{this.props.file.fileName}</span>
                </a>
              </Grid.Column>
            </Grid.Row>
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
  }
}


export default connect(mapStateToProps, { fileNotFound, uploadFileApi, removeFileApi })(PrevImage);;