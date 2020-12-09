/* eslint-disable */

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
  }

  componentDidMount = () => {
    this.props.fetchCV(this.props.match.params.id);
    this.props.fetchCats();
    document.addEventListener('keydown', this.keySave, false);
  }
  
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.keySave, false);
  }
  
  componentDidUpdate = (props) => {
    if (this.props.cv !== props.cv) {
      this.setState({ cv: this.props.cv })
    }
    if (this.props.categories !== props.categories) {
      this.setState({ categories: this.props.categories })
    }
    if (this.props.notification !== props.notification) {
      this.setState({ notification: this.props.notification })
    }
    
  }
 
  summaryChange = (e) => {
    const {summary} = this.state.cv;
    this.state.cv.summary = e;
    this.setState({ summary })
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
    const {persdetails} = this.state.cv;
    persdetails[e.target.name] = e.target.value;
    this.setState({ persdetails })
  }
  
  skillsChange = ({langSkills, webdevSkills, itSkills, workExp, educ}) => {
    this.setState({langSkills, webdevSkills, itSkills, workExp, educ})
  }
  
  cvName = e => {
    const {cv} = this.state;
    cv[e.target.name] = e.target.value
    this.setState({ cv })
  }
  
  keySave = e => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        this.onSubmit(e);
      }
    }
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    clearTimeout();
    const {cv, notification} = this.props;
    this.props.saveCV(cv).then(res => {
      this.props.generatePDF(cv._id).then(url => {
        this.props.saveCV(cv).then(res => console.log('second save'));
      })
    });
  }
  
  render() {
    console.log(this.props);
    return (
      <div id="detail">
      <form onSubmit={this.onSubmit} >
        { this.props.cats && <Metainfo 
          meta={this.props.cats}
          name={this.props.name}
          locales={this.props.locales}
          positions={this.props.positions}
          statuses={this.props.statuses}
          onChange={this.metaChange}
        /> }
        <div className="container">
          { this.props.summary && <Summary summary={this.props.summary} onChange={this.summaryChange} /> }
          { this.props.persdetails && <PD persdetails={this.props.persdetails} onChange={this.pdChange} /> }
            
          { this.props.workExp && <WorkRepeater workExp={this.props.workExp} update={this.skillsChange} /> }
          { this.props.educ && <Education educ={this.props.educ} update={this.skillsChange} /> }
          
          { this.props.langSkills && <LangSkills langSkills={this.props.langSkills} update={this.skillsChange} /> }
          { this.props.webdevSkills && <WebdevSkills webdevSkills={this.props.webdevSkills} update={this.skillsChange} /> }
          { this.props.itSkills && <ItSkills itSkills={this.props.itSkills} update={this.skillsChange} /> }
          
          <br />          
          
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

  const { cvReducer, catsReducer } = state;
  return {
    ...cvReducer,
    ...catsReducer
  }
  // if (state.cvs[0]._id && state.cats[0]._id) {
  //   const cv = state.cvs.find(item => item._id === props.match.params.id);
    
  //   return {
  //     cv: cv,
  //     categories: state.cats,
  //     notification: state.notification
  //   }
  // } else {
  //   return { 
  //     cv: state.cvs[0],
  //     categories: state.cats,
  //     notification: state.notification
  //   }    
  // }
  
}

export default connect(mapStateToProps, { saveCV, fetchCVs, fetchCV, fetchCats, generatePDF })(Detail);


