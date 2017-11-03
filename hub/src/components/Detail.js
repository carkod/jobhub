/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import shortid from 'shortid';
import { Icon, Button} from 'semantic-ui-react';
import { saveCV, fetchCVs } from '../actions';
import RichTextEditor from 'react-rte';

//import PersonalDetails from './PersonalDetails'; 
import PD from './PD'; 
import WorkRepeater from './WorkRepeater'; 

const cvModel = (cv) => {
  
  if (cv && cv.workExp) {
    cv.workExp.map((i) => {
      if (i.desc.length < 0)
      i.desc = RichTextEditor.createEmptyValue();
    })
  } 
  
  return {
      _id: cv._id || '',
      name: cv.name || '',
      createdDate: cv.createdDate || '',
      updatedDate: cv.updatedDate || '',
      persdetails: cv.persdetails || { name: '', lastname: ''},
      workExp: cv.workExp || [{
          id: 'workExp-0', 
          date:'', 
          position:'', 
          desc: RichTextEditor.createEmptyValue(),
      }],  
  }
}

class Detail extends Component {

  constructor(props) {
    super(props);
    let cv = this.props.cv || '';
    this.state = cvModel(cv);
    this.triggerDescChange = this.triggerDescChange.bind(this);
   this.pdChange = this.pdChange.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (props) => {
    const {cv} = props;
    console.log(cv)
    this.setState(cvModel(cv))
  }
  
  pdChange = (e) => {
    const persdetails = Object.assign({}, this.state.persdetails, {
       [e.target.name]: e.target.value
     });
    this.setState({ persdetails })
  }
  
   repeatFormUpdate =  (i, e) => {
    
     const workExp = Object.assign(this.state.workExp[i], {
       [e.target.name]: e.target.value
     });

     this.setState(workExp)
  }
    
  pushWork = (e) => {
    e.preventDefault();
    const workID = 'workExp-' + shortid.generate();
    
    this.state.workExp.push({ id: workID, desc: RichTextEditor.createEmptyValue() })
    this.setState({ workExp: this.state.workExp });
  }
  
  removeWork = (i,e) => {
    e.preventDefault();
    const findIndex = this.state.workExp[i];
    
    this.state.workExp.splice(i,1)
    this.setState({ workExp: this.state.workExp });	
  }
  
  triggerDescChange = (i, e) => {
    const {workExp} = this.state;
    workExp[i].desc = e.toString('html');
    this.setState({workExp})
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveCV(this.state);
    
  }
  
  render() {
    console.log(this.state)
    return (
      <div id="detail">
        <h1>{this.state.name}</h1>
        <div className="metainfo">
          <h2>Meta information:</h2>
          <p>ID: {this.props._id}</p>
          <p>Created: {this.state.createdDate}</p>
          <p>Updated: {this.state.updatedDate}</p>
        </div>
        
        <div className="container">
          <form onSubmit={this.onSubmit} >
          
          {/*<PersonalDetails update={this.persdetails} persdetails={this.state.persdetails} />*/}
          <PD persdetails={this.state.persdetails} onChange={this.pdChange} />
          <WorkRepeater update={this.repeatFormUpdate} workExp={this.state.workExp} removeWork={this.removeWork} pushWork={this.pushWork} triggerDescChange={this.triggerDescChange}/>
          
          <Button type="submit" value="Save">
            <Icon name="save" />Save
          </Button>
          
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  if (state.cvs.length > 0) {
    return {
      cv: state.cvs.find(item => item._id === ownProps.match.params.id)
    }
    
  } else {
    return { cv: null }    
  }
  
}


export default connect(mapStateToProps, { saveCV, fetchCVs })(Detail);


