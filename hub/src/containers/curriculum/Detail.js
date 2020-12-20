import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { fetchCV, fetchCVs, generatePdfApi, saveCvApi } from '../../actions/cv';
import { fetchRelationsApi } from '../../actions/relations';
import { checkValue } from '../../utils';
import Metainfo from '../../components/Metainfo';
import Education from './Education';
import ItSkills from './ItSkills';
import LangSkills from './LangSkills';
import PD from './PD';
import Summary from './Summary';
import WebdevSkills from './WebdevSkills';
import WorkRepeater from './WorkRepeater';


class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cats: null,
      locales: null,
      positions: null,
      statuses: null,
      name: null,
      summary: null,
      workExp: null,
      persdetails: null,
      educ: null,
      langSkills: null,
      webdevSkills: null,
      itSkills: null,
      previewPdf: `${process.env.REACT_APP_PDF_URL}/fullprint/${props.match.params.id}`
    }
  }

  componentDidMount = () => {
    this.props.fetchCV(this.props.match.params.id);
    this.props.fetchRelationsApi();
  }

  componentDidUpdate = (props) => {
    if (this.props !== props) {
      this.setState({ ...this.props })
    }

  }

  summaryChange = (e) => {
    this.setState({ summary: e });
  }

  metaChange = (e, element) => {
    if (checkValue(e.target.name)) {
      this.setState({ [e.target.name]: e.target.value })
    } else {
      this.setState(produce(draft => { draft.cats[element.name] = element.value }))
    }
  }

  pdChange = (e) => {
    this.setState({
      persdetails: {
        ...this.state.persdetails,
        [e.target.name]: e.target.value
      }
    })
  }

  skillsChange = ({ langSkills, webdevSkills, itSkills, workExp, educ }) => {
    if (checkValue(langSkills)) {
      this.setState({ langSkills: langSkills })
    }
    if (checkValue(webdevSkills)) {
      this.setState({ webdevSkills: webdevSkills })
    }
    if (checkValue(itSkills)) {
      this.setState({ itSkills: itSkills })
    }
    if (checkValue(workExp)) {
      this.setState({ workExp: workExp })
    }
    if (checkValue(educ)) {
      this.setState({ educ: educ })
    }
  }

  cvName = e => {
    this.setState({ name: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveCvApi(this.state);
  }

  savePdf = (id) => async (e) => {
    e.preventDefault();
    const response = await this.props.generatePdfApi(id);
    const blob = new Blob([response], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `Carlos-Wu-${this.state.name}.pdf`
    link.click()
  }

  render() {
    return (
      <div id="detail">
        <form onSubmit={this.onSubmit} >
          {this.state.cats && <Metainfo
            meta={this.state.cats}
            name={this.state.name}
            navName={this.state.navName}
            previewPdf={this.state.previewPdf}
            locales={this.state.locales}
            positions={this.state.positions}
            statuses={this.state.statuses}
            onChange={this.metaChange}
          />}
          <div className="container">
            {this.state.summary && <Summary summary={this.state.summary} onChange={this.summaryChange} />}
            {this.state.persdetails && <PD persdetails={this.state.persdetails} onChange={this.pdChange} />}

            {this.state.workExp && <WorkRepeater workExp={this.state.workExp} update={this.skillsChange} />}
            {this.state.educ && <Education educ={this.state.educ} update={this.skillsChange} />}

            {this.state.langSkills && <LangSkills langSkills={this.state.langSkills} update={this.skillsChange} />}
            {this.state.webdevSkills && <WebdevSkills webdevSkills={this.state.webdevSkills} update={this.skillsChange} />}
            {this.state.itSkills && <ItSkills itSkills={this.state.itSkills} update={this.skillsChange} />}

            <br />

            <Button type="submit" color='green'>
              <Icon name="save" />Save
            </Button>

            <Button type="button" onClick={this.savePdf(this.props.match.params.id)}>
              <Icon name="file pdf" />Generate
            </Button>

          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {

  const { cvReducer, catsReducer } = state;
  return {
    ...cvReducer,
    ...catsReducer
  }

}

export default connect(mapStateToProps, { saveCvApi, fetchCVs, fetchCV, fetchRelationsApi, generatePdfApi })(Detail);


