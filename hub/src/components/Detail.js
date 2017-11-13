/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { Icon, Button, Header } from 'semantic-ui-react';
import { saveCV, fetchCVs } from '../actions/cv';
import RichTextEditor from 'react-rte';

import Summary from './Summary'; 
import Metainfo from './Metainfo'; 
import PD from './PD'; 
import WorkRepeater from './WorkRepeater';
import Education from './Education';
import LangSkills from './LangSkills';
import WebdevSkills from './WebdevSkills';
import ItSkills from './ItSkills';
import SysMessage from './SysMessage';

class Detail extends Component {

  constructor(props) {
    super(props);
    let {cv, detail} = this.props;
    this.state = {
      cv: cv,
      detail: detail
    };
    this.pdChange = this.pdChange.bind(this);
    this.metaChange = this.metaChange.bind(this);
    this.skillsChange = this.skillsChange.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (props) => {
    const {cv} = props;
    this.setState({ cv })
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
      cv[value.name] = value.value;
    }
    this.setState({ cv })
  }
  
  pdChange = (e) => {
    const {persdetails} = this.state.cv;
    persdetails[e.target.name] = e.target.value;
    this.setState({ persdetails })
  }
  
  skillsChange = ({langSkills, webdevSkills, itSkills, workExp}) => {
    this.setState({langSkills, webdevSkills, itSkills, workExp})
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    clearTimeout();
    const {messages} = this.state.detail;
    this.props.saveCV(this.state.cv).then(status => {
      this.state.detail.messages.savedID = status.data._id;
      this.setState({ messages })
    });
    
  }
  
  render() {
    const {cv} = this.state;
    return (
      <div id="detail">
      <form onSubmit={this.onSubmit} >
        <Metainfo meta={cv} onChange={this.metaChange} />
        <div className="container">
          <Summary summary={cv.summary} onChange={this.summaryChange} />
          <PD persdetails={cv.persdetails} onChange={this.pdChange} />
          
          <WorkRepeater workExp={cv.workExp} update={this.skillsChange} />
          <Education educ={cv.educ} update={this.skillsChange} />
          
          <LangSkills langSkills={cv.langSkills} update={this.skillsChange} />
          <WebdevSkills webdevSkills={cv.webdevSkills} update={this.skillsChange} />
          <ItSkills itSkills={cv.itSkills} update={this.skillsChange} />
          
          <SysMessage messages={this.state.detail.messages} />
          
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
  if (state.cvs[0]._id) {
    const cv = state.cvs.find(item => item._id === props.match.params.id);
    return {
      cv: cv,
      detail: state.detail
    }
  } else {
    return { 
      cv: state.cvs[0],
      detail: state.detail
    }    
  }
  
}


export default connect(mapStateToProps, { saveCV, fetchCVs })(Detail);


