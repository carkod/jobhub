import produce from 'immer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { fetchProjectApi, saveProjectApi } from '../../actions/portfolio';
import { uploadFile } from '../../actions/project';
import { fetchRelationsApi } from '../../actions/relations';
import Metainfo from '../../components/Metainfo';
import Files from './Files';
import Links from './Links';
import PrevImage from './PrevImage';
import ProjectDesc from './ProjectDesc';

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
    this.setState(produce(draft => {
      draft.project[e.target.name] = e.target.value
    }));
  }

  metaChange = (e, props) => {
    const { value, name } = props;
    this.setState(produce(draft => {
      draft.project.cats[name] = value
    }));
  }

  descChange = (v) => {
    this.setState(produce(draft => {
      draft.project.desc = v
    }));
  }

  handleChange = (links) => {
    this.setState(produce(draft => {
      draft.project.links = links;
    }));
  }

  handleFiles = (docs) => {
    this.setState(produce(draft => {
      draft.project.documents.push(docs);
    }));
  }

  removeDocs = (docs) => {
    this.setState(produce(draft => {
      const index = this.state.project.documents.findIndex(x => x.fileId === docs.fileId);
      draft.project.documents.splice(index, 1);
    }));
  }

  handlePrevImg = ({ image }) => {
    this.setState(produce(draft => {
      draft.project.image = image
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { project } = this.state;
    this.props.saveProjectApi(project)
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
                <Files documents={project.documents} onUpload={this.handleFiles} onDeupload={this.removeDocs} />
                <Links links={project.links} onChange={this.handleChange} />
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


export default connect(mapStateToProps, { saveProjectApi, fetchProjectApi, uploadFile, fetchRelationsApi })(Project);

