/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { Icon, Button, Header, Input } from 'semantic-ui-react';
import RichTextEditor from 'react-rte';

import { saveProject, fetchPortfolio, uploadFile } from '../../actions/project';

import Metainfo from './Metainfo'; 
import Files from './Files'; 
import Editor from './Editor'; 
import SysMessage from './SysMessage';

class Project extends Component {

  constructor(props) {
    super(props);
    let {project, detail} = this.props;
    this.state = {
      project: props.project,
    };
    //this.onChange = this.onChange.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchPortfolio();
  }
  
  componentWillReceiveProps = (props) => {
    const {project} = props;
    this.setState({ project })
  }
  
  metaChange = (e, value) => {
    const {project} = this.state;
    if (e.target.name) {
      project[e.target.name] = e.target.value;
    } else {
      project[value.name] = value.value;
    }
    this.setState({ project })
  }
  
  descChange = (e) => {
    const {value} = e.target.value;
    console.log(value)
    this.setState({ desc: value })
  }
  
  /*onChange = ({langSkills, webdevSkills, itSkills, workExp}) => {
    this.setState({langSkills, webdevSkills, itSkills, workExp})
  }*/
  
  /*onChange = (e) => {
    const {files} = this.state.project;
    this.state.project.files = e
    this.setState({ files })
  }*/
  
  handleFiles = (docs) => {
    const {project} = this.state;
    this.state.project.documents = docs.documents;
    console.log(docs)
    this.setState({ project })
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const {project} = this.state;
    //const {messages} = this.state.projUI;
    
    this.props.saveProject(project).then(status => {
      //this.state.detail.messages.savedID = status.data._id;
      //this.setState({ messages })
    });
    
  }
  
  render() {
    const {project} = this.state;
    console.log(this.state)
    return (
      <div id="project">
      <form onSubmit={this.onSubmit} name="project" >
        <Metainfo meta={project} onChange={this.metaChange} />
        <div className="container">
          {/*<Editor value={project.desc} onChange={this.descChange} />*/}
          <Files documents={project.documents} onUpload={this.handleFiles}/>
          {/*<SysMessage messages={this.state.projUI.messages} />*/}
          
          <Button type="submit" value="Save">
            <Icon name="save" />Save
          </Button>
          
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (state.portfolio[0]._id) {
    const project = state.portfolio.find(item => item._id === props.match.params.id);
    return {
      project: project,
      projUI: state.projUI
    }
  } else {
    return { 
      project: state.portfolio[0],
      detail: state.detail
    }    
  }
  
}


export default connect(mapStateToProps, { saveProject, fetchPortfolio, uploadFile })(Project);

