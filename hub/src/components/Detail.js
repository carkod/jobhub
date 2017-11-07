/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { Icon, Button, Header } from 'semantic-ui-react';
import { saveCV, fetchCVs } from '../actions';
import RichTextEditor from 'react-rte';

import Metainfo from './Metainfo'; 
import PD from './PD'; 
import WorkRepeater from './WorkRepeater'; 
import SysMessage from './SysMessage';

/*const cvModel = (cv) => {
  
  if (cv && cv.workExp) {
    cv.workExp.map((i) => {
      if (i.desc.length < 0)
      i.desc = RichTextEditor.createEmptyValue();
    })
  } 
  
  return {
    cv: {
      _id: cv._id || '',
      name: cv.name || '',
      createdAt: cv.createdAt || '',
      updatedAt: cv.updatedAt || '',
      persdetails: cv.persdetails || { name: '', lastname: ''},
      workExp: cv.workExp || [{
          id: 'workExp-0', 
          date:'', 
          position:'', 
          company:'',
          desc: RichTextEditor.createEmptyValue(),
      }], 
      position: '',
      language: '',
      
    },
    sysMessage: false
      
  }
}*/

class Detail extends Component {

  constructor(props) {
    super(props);
    let {cv, detail} = this.props;
    this.state = {
      cv: cv,
      detail: detail
    };
    this.triggerDescChange = this.triggerDescChange.bind(this);
   this.pdChange = this.pdChange.bind(this);
   this.metaChange = this.metaChange.bind(this);
   this.repeatFormUpdate = this.repeatFormUpdate.bind(this);
   //console.log(this.state)
  }

  componentDidMount = () => {
    this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (props) => {
    const {cv} = props;
    this.setState(props)
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
    /*const persdetails = Object.assign({}, this.state.cv.persdetails, {
       [e.target.name]: e.target.value
     });*/
     persdetails[e.target.name] = e.target.value;
     
    this.setState({ persdetails })
  }
  
   repeatFormUpdate =  (i, e) => {
    
     const workExp = Object.assign(this.state.cv.workExp[i], {
       [e.target.name]: e.target.value
     });

     this.setState(workExp)
  }
    
  pushWork = (e) => {
    e.preventDefault();
    const workID = 'workExp-' + shortid.generate();
    const {workExp} = this.state.cv;
    const newWork = {
      id: workID, 
      position: '', 
      company:'',
      desc: RichTextEditor.createEmptyValue()
    }
    workExp.push(newWork)
    this.setState({ workExp });
  }
  
  removeWork = (i,e) => {
    e.preventDefault();
    const findIndex = this.state.cv.workExp[i];
    
    this.state.workExp.splice(i,1)
    this.setState({ workExp: this.state.workExp });	
  }
  
  triggerDescChange = (i, e) => {
    const {workExp} = this.state.cv;
    workExp[i].desc = e.toString('html');
    this.setState({workExp})
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveCV(this.state.cv).then(data => console.log(data));
    
  }
  
  render() {
    const {cv} = this.state;
    //console.log(this.state)
    return (
      <div id="detail">
      <form onSubmit={this.onSubmit} >
        <Metainfo meta={cv} onChange={this.metaChange} />
        <div className="container">
          
          <PD persdetails={cv.persdetails} onChange={this.pdChange} />
          <WorkRepeater update={this.repeatFormUpdate} workExp={cv.workExp} removeWork={this.removeWork} pushWork={this.pushWork} triggerDescChange={this.triggerDescChange}/>
          
          <Button type="submit" value="Save">
            <Icon name="save" />Save
          </Button>
          {/*<SysMessage message={this.state.sysMessage} />*/}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (state.cvs[0]._id) {
    return {
      cv: state.cvs.find(item => item._id === props.match.params.id),
      detail: state.cvs
    }
    
  } else {
    return { 
      cv: state.cvs[0],
      detail: null
    }    
  }
  
}


export default connect(mapStateToProps, { saveCV, fetchCVs })(Detail);


