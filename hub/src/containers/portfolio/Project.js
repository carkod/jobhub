import Metainfo from '../../components/Metainfo';
import Files from './Files';
import Links from './Links';
import PrevImage from './PrevImage';
import ProjectDesc from './ProjectDesc';
import produce from 'immer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { fetchPortfolio, saveProject, uploadFile } from '../../actions/project';
import { fetchRelationsApi } from '../../actions/relations';
import { fetchProjectApi } from '../../actions/portfolio';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      project: null,
      categories: null,
    };
  }

  componentDidMount = () => {
    this.props.fetchProjectApi(this.props.match.params.id);
    this.props.fetchRelationsApi();
  }

  componentDidUpdate = (props) => {
    if (this.props.project !== props.project || this.props.categories !== props.categories) {
      this.setState(produce(draft => {
        draft.project = this.props.project;
        draft.categories = this.props.categories;
      }))
    }
  }

  projectName = e => {
    const { project } = this.state;
    project[e.target.name] = e.target.value
    this.setState({ project })
  }

  metaChange = (e, props) => {
    const { project } = this.state;
    const { value, name } = props;
    project.cats[name] = value;
    this.setState({ project })
  }

  descChange = (v) => {
    const { desc } = this.state.project;
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

  onSubmit = (e) => {
    e.preventDefault();
    const { project } = this.state;
    this.props.saveProject(project)
  }

  render() {
    const { project } = this.state;
    return (
      <div id="project">
        <h1 className="u-section-title">Section - Projects</h1>
        <form onSubmit={this.onSubmit} name="project" >
          {this.state.name && <Metainfo
            name={this.state.name}
            meta={this.state.cats}
            navName={this.state.navName}
            previewPdf={this.state.previewPdf}
            locales={this.state.locales}
            positions={this.state.positions}
            statuses={this.state.statuses}
            onChange={this.metaChange}
          />
          }
          {this.state.project &&
            <>
              <div className="container">
                <PrevImage image={project.image} onUpload={this.handlePrevImg} />

              </div>
              <div className="personal">
                <ProjectDesc desc={project.desc} onChange={this.descChange} />
              </div>
              <div className="">
                <Files documents={project.documents} onUpload={this.handleFiles} onDeupload={this.handleFiles} />
                <Links links={project.links} onChange={l => this.handleChange(l)} />
              </div>

              <br />

              <Button type="submit" type="submit" color='green'>
                  <Icon name="save" />Save
                </Button>
            </>
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { catsReducer, projectReducer } = state;
  return {
    categories: catsReducer,
    project: projectReducer
  }

}


export default connect(mapStateToProps, { saveProject, fetchProjectApi, uploadFile, fetchRelationsApi })(Project);

