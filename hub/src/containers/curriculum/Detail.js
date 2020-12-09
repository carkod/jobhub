import { Buffer } from 'buffer';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { fetchCVs, fetchCV, generatePDF, saveCV } from '../../actions/cv';
import { fetchCats } from '../../actions/project';
import Metainfo from '../Metainfo';
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
      fullprint: null,
      summary: null,
      workExp: null,
      persdetails: null,
      educ: null,
      langSkills: null,
      webdevSkills: null,
      itSkills: null,
    }
  }

  componentDidMount = () => {
    this.props.fetchCV(this.props.match.params.id);
    this.props.fetchCats();
  }
  
  componentDidUpdate = (props) => {
    if (this.props !== props) {
      this.setState({ ...this.props })
    }
    
  }
 
  summaryChange = (e) => {
    this.setState({ summary: e });
  }
  
  metaChange = (e, value) => {
    const {cv} = this.state;
    if (e.target.name) {
      cv[e.target.name] = e.target.value;
    } else {
      cv.cats[value.name] = value.value;
    }
    this.setState({ cv })
  }
  
  pdChange = (e) => {
    this.setState({ 
      persdetails: {
        ...this.state.persdetails,
        [e.target.name]: e.target.value
      } 
    })
  }
  
  skillsChange = ({langSkills, webdevSkills, itSkills, workExp, educ}) => {
    this.setState({
      langSkills, webdevSkills, itSkills, workExp, educ
    })
  }
  
  cvName = e => {
    this.setState({ name: e.target.value })
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveCV(this.state).then(res => {
      console.log(res);
    });
  }

  savePdf = (id) => async (e) => {
    e.preventDefault();
    try {
      const response = await generatePDF(id);
      const blob = new Blob([response], {type: 'application/pdf'})
       const link = document.createElement('a')
       link.href = window.URL.createObjectURL(blob)
       link.download = `Carlos-Wu-${this.state.name}.pdf`
       link.click()
    } catch (e) {
      console.log("error generating pdf" + e)
    }
    
  }
  
  render() {
    console.log(this.props);
    return (
      <div id="detail">
      <form onSubmit={this.onSubmit} >
        { this.state.cats && <Metainfo 
          meta={this.state.cats}
          name={this.state.name}
          pdf={this.state.fullprint}
          locales={this.state.locales}
          positions={this.state.positions}
          statuses={this.state.statuses}
          onChange={this.metaChange}
        /> }
        <div className="container">
          { this.state.summary && <Summary summary={this.state.summary} onChange={this.summaryChange} /> }
          { this.state.persdetails && <PD persdetails={this.state.persdetails} onChange={this.pdChange} /> }
            
          { this.state.workExp && <WorkRepeater workExp={this.state.workExp} update={this.skillsChange} /> }
          { this.state.educ && <Education educ={this.state.educ} update={this.skillsChange} /> }
          
          { this.state.langSkills && <LangSkills langSkills={this.state.langSkills} update={this.skillsChange} /> }
          { this.state.webdevSkills && <WebdevSkills webdevSkills={this.state.webdevSkills} update={this.skillsChange} /> }
          { this.state.itSkills && <ItSkills itSkills={this.state.itSkills} update={this.skillsChange} /> }
          
          <br />          
          
          <Button type="submit">
            <Icon name="save" />Save
          </Button>

          <Button type="button" onClick={this.savePdf(this.props.match.params.id)}>
            <Icon name="save" />Generate PDF
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

export default connect(mapStateToProps, { saveCV, fetchCVs, fetchCV, fetchCats })(Detail);


