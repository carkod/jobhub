/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { Icon, Button, Header, Input, Checkbox } from 'semantic-ui-react';
import RichTextEditor from 'react-rte';
import { saveCV, fetchCVs } from '../../actions/cv';
import { authorization } from '../../actions/linkedin';
import SysMessage from '../SysMessage';

import Summary from './Summary'; 
import Metainfo from './Metainfo'; 
import PD from './PD'; 
import WorkRepeater from './WorkRepeater';
import Education from './Education';
import LangSkills from './LangSkills';
import WebdevSkills from './WebdevSkills';
import ItSkills from './ItSkills';


class Detail extends Component {

  constructor(props) {
    super(props);
    let {cv, detail} = this.props;
    this.state = {
      cv: cv,
      detail: detail,
    };
    this.pdChange = this.pdChange.bind(this);
    this.metaChange = this.metaChange.bind(this);
    this.skillsChange = this.skillsChange.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchCVs();
    document.addEventListener('keydown', this.keySave, false);
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
      cv.cats[value.name] = value.value;
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
  
  keySave = e => {
    const {cv} = this.state;
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        this.props.saveCV(cv).then(status => {
          console.log('saved')
          //this.state.detail.messages.savedID = status.data._id;
          //this.setState({ messages })
        });
      }
    }
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    clearTimeout();
    const {messages} = this.state.detail;
    const {_id} = this.state.cv;
    
    if (this.state.linkedin) {
        this.props.saveCV(this.state.cv).then(status => {
        this.state.detail.messages.savedID = status.data._id;
        this.setState({ messages });
        authorization(_id)
      })
      .then(() => window.location = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78n5odk9nuiotg&redirect_uri=http%3A%2F%2Fcv-generator-carkod.c9users.io%3A8081%2Fapi%2Flinkedin&state=48295620` );  
    } else {
      this.props.saveCV(this.state.cv).then(status => {
      this.state.detail.messages.savedID = status.data._id;
      this.setState({ messages })
    });
    }
    
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
          
          <div className="section">
          <Checkbox type="checkbox" label={<label><i className="blue linkedin square large icon"/></label>} toggle checked={this.state.linkedin} onChange={() => this.setState({ linkedin: !this.state.linkedin})} fitted/>
          
          <Checkbox type="checkbox" label='Push to Jobbio' toggle checked={this.state.jobbio} onChange={() => this.setState({ jobbio: !this.state.jobbio})} />
          </div>
          
          <SysMessage messages={this.state.detail.messages} />
          
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


