/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { Icon, Button, Header, Input } from 'semantic-ui-react';
import RichTextEditor from 'react-rte';

import { saveProject, fetchPortfolio, uploadFile, fetchCats } from '../../actions/project';

import Metainfo from './Metainfo'; 
import Files from './Files'; 
import Editor from './Editor'; 
import Links from './Links'; 
import SysMessage from './SysMessage';

class Project extends Component {

  constructor(props) {
    super(props);
    let {project, detail} = this.props;
    this.state = {
      project: props.project,
    };
    this.metaChange = this.metaChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchPortfolio();
    this.props.fetchCats();
    document.addEventListener('keydown', this.keySave, false);
  }
  
  componentWillReceiveProps = (props) => {
    const {project} = props;
    const {categories} = props;
    this.setState({ project, categories })
  }
  
  metaChange = (e, value) => {
    const {project} = this.state;
    if (e.target.name) {
      project[e.target.name] = e.target.value;
    } else {
      project.cats[value.name] = value.value;
    }
    this.setState({ project })
  }
  
  descChange = (v) => {
    const {desc} = this.state.project;
    this.state.project.desc = v;
    this.setState({ desc })
  }
  
  handleChange = ({links}) => {
    this.setState({links: links})
  }
 
  handleFiles = (docs) => {
    const {project} = this.state;
    this.state.project.documents = docs.documents;
    this.setState({ project });
    this.props.saveProject();
  }
  
  keySave = e => {
    const {project} = this.state;
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        this.props.saveProject(project).then(status => {
          //this.state.detail.messages.savedID = status.data._id;
          //this.setState({ messages })
        });
      }
    }
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
    const {project} = !!Object.keys(this.state).length ? this.state : this.props;
    const {categories} = this.props;
    
    return (
      <div id="project">
      <form onSubmit={this.onSubmit} name="project" >
        <Metainfo meta={project} onChange={this.metaChange} categories={categories ? categories.data : false} />
        <div className="container">
          <Editor value={project.desc} onChange={v => this.descChange(v)} />
          <Files documents={project.documents} onUpload={this.handleFiles} onDeupload={this.handleFiles}/>
          <Links links={project.links} onChange={l => this.handleChange(l)} />
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
      projUI: state.projUI,
      categories: state.cats
    }
  } else {
    return { 
      project: state.portfolio[0],
      detail: state.detail,
      categories: [],
    }    
  }
  
}


export default connect(mapStateToProps, { saveProject, fetchPortfolio, uploadFile, fetchCats })(Project);

