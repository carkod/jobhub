/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import { fetchCats, fetchPortfolio, saveProject, uploadFile } from '../../actions/project';
import Editor from '../../components/Editor';
import Files from './Files';
import Links from './Links';
import Metainfo from './Metainfo';
import PrevImage from './PrevImage';
import ProjectDesc from './ProjectDesc';


class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      categories: props.categories
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
    const { project, categories } = props;
    this.setState({ project, categories })
  }

  projectName = e => {
    const { project } = this.state;
    project[e.target.name] = e.target.value
    this.setState({ project })
  }

  metaChange = (e, props) => {
    const { project } = this.state;
    const { value } = props;
    const { name } = props;
    project.cats[name] = value;
    this.setState({ project })
  }

  descChange = (v) => {
    const {desc} = this.state.project;
    this.state.project.desc = v;
    this.setState({ desc })
  }

  handleChange = ({ links }) => {
    this.setState({ links: links })
  }

  handleFiles = (docs) => {
    const { project } = this.state;
    this.state.project.documents = docs.documents;
    this.setState({ project });
    this.props.saveProject(project)
  }

  handlePrevImg = ({ image }) => {
    const { project } = this.state;
    const newState = Object.assign({}, project, {
      image: image
    })
    this.setState({ project: newState });
  }

  keySave = e => {
    const { project } = this.state;
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        this.onSubmit(e)
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { project } = this.state;
    this.props.saveProject(project)
  }

  render() {
    const { project } = !!Object.keys(this.state).length ? this.state : this.props;
    const { categories } = this.state;
    return (
      <div id="project">
        <form onSubmit={this.onSubmit} name="project" >
          <Metainfo meta={project} onChange={this.metaChange} categories={categories} name={this.projectName} />
          <div className="container">
            <PrevImage image={project.image} onUpload={this.handlePrevImg} />

          </div>
          <div className="personal section">
            <ProjectDesc desc={project.desc} onChange={this.descChange}/>
          </div>
          <div className="section">
            <Files documents={project.documents} onUpload={this.handleFiles} onDeupload={this.handleFiles} />
            <Links links={project.links} onChange={l => this.handleChange(l)} />
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
      categories: state.cats,
    }
  }

}


export default connect(mapStateToProps, { saveProject, fetchPortfolio, uploadFile, fetchCats })(Project);

