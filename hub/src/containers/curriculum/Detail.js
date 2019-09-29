/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { fetchCVs, generatePDF, saveCV } from '../../actions/cv';
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
    let {cv, detail, categories} = this.props;
    this.state = {
      cv: cv,
      detail: detail,
      categories: categories,
    };
    this.pdChange = this.pdChange.bind(this);
    this.metaChange = this.metaChange.bind(this);
    this.skillsChange = this.skillsChange.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchCVs();
    this.props.fetchCats();
    document.addEventListener('keydown', this.keySave, false);
  }
  
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.keySave, false);
  }
  
  componentWillReceiveProps = (props) => {
    const {cv, categories} = props;
    this.setState({ cv, categories })
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
    const {cv, notification} = this.state;
    this.props.saveCV(cv).then(res => {
      this.props.generatePDF(cv._id).then(url => {
        this.props.saveCV(cv).then(res => console.log('second save'));
      })
    });
  }
  
  render() {
    const {cv, categories} = this.state;
    // console.log(this.props)
    return (
      <div id="detail">
      <form onSubmit={this.onSubmit} >
        <Metainfo meta={cv} onChange={this.metaChange} categories={categories} name={this.cvName}/>
        <div className="container">
          <Summary summary={cv.summary} onChange={this.summaryChange} />
          <PD persdetails={cv.persdetails} onChange={this.pdChange} />
          
          <WorkRepeater workExp={cv.workExp} update={this.skillsChange} />
          <Education educ={cv.educ} update={this.skillsChange} />
          
          <LangSkills langSkills={cv.langSkills} update={this.skillsChange} />
          <WebdevSkills webdevSkills={cv.webdevSkills} update={this.skillsChange} />
          <ItSkills itSkills={cv.itSkills} update={this.skillsChange} />
          
          {/*<div className="section">
          <Checkbox type="checkbox" label={<label><i className="blue linkedin square large icon"/></label>} toggle checked={this.state.linkedin} onChange={() => this.setState({ linkedin: !this.state.linkedin})} fitted/>
          
          <Checkbox type="checkbox" label='Push to Jobbio' toggle checked={this.state.jobbio} onChange={() => this.setState({ jobbio: !this.state.jobbio})} />
          </div>*/}
          
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
  if (state.cvs[0]._id && state.cats[0]._id) {
    const cv = state.cvs.find(item => item._id === props.match.params.id);
    
    return {
      cv: cv,
      categories: state.cats,
      notification: state.notification
    }
  } else {
    return { 
      cv: state.cvs[0],
      categories: state.cats,
      notification: state.notification
    }    
  }
  
}

export default connect(mapStateToProps, { saveCV, fetchCVs, fetchCats, generatePDF })(Detail);


