/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import shortid from 'shortid';
import { Icon, Button} from 'semantic-ui-react';
import { saveCV, fetchCVs } from '../actions';

import PersonalDetails from './PersonalDetails'; 
import WorkRepeater from './WorkRepeater'; 

const data = (cv) => {
    return {
    _id: cv._id || '',
    name: cv.name || '',
    createdDate: cv.createdDate || '',
    updatedDate: cv.updatedDate || '',
    persdetails: {
      name: cv.persdetails.name || '',
      lastname: cv.persdetails.lastname || '',
    },
    workExp: cv.workExp || [{id: 'workExp-0',  date:'', position:'', desc}],
  }
};

class Detail extends Component {

  constructor(props) {
    super(props);
    const cv = this.props.cv;
    if (cv) {
      this.state = {
        _id: cv._id || '',
        name: cv.name || '',
        createdDate: cv.createdDate || '',
        updatedDate: cv.updatedDate || '',
        persdetails: cv.persdetails || '',
        workExp: cv.workExp || [{id: 'workExp-0', date:'', position:''}],
      }  
    } else {
      this.state = {
        _id: '',
        name: '',
        createdDate: '',
        updatedDate: '',
        persdetails: {
          name: '',
          lastname: ''
        },
        workExp: [{id: 'workExp-0', date:'', position:''}],
      }  
    }
    
    
  }

  componentDidMount = () => {
    this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (nextProps) => {
    const cv = nextProps.cv;
    this.setState({
      _id: cv._id || '',
      name: cv.name || '',
      createdDate: cv.createdDate || '',
      updatedDate: cv.updatedDate || '',
      persdetails: cv.persdetails || '',
      workExp: cv.workExp || [{id: 'workExp-0', date:'', position:''}],
    })
    
  }
  
  setData = () => {
    const { _id, name, createdDate, updatedDate, persdetails, workExp } = this.props.cv;
      this.setState(data({ _id, name, createdDate, updatedDate, persdetails, workExp }))    
  }
  
  formUpdate = ( e ) => {
    
    const persdetails = Object.assign({}, this.state.persdetails, {
        [e.target.name]: e.target.value        
    })
    this.setState({ persdetails })
    
  }
  
   repeatFormUpdate = ( i, e ) => {
    
     const workExp = Object.assign(this.state.workExp[i], {
       [e.target.name]: e.target.value
     });
    this.setState( workExp )
  }
  
  repeatFormDesc = (content, i) => {
    const workExp = Object.assign(this.state.workExp[i], {
       desc: content
     });
     
     this.setState( workExp )
  }
  
    
  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveCV(this.state)
    
  }
 
  pushWork = (e) => {
    e.preventDefault();
    const workID = 'workExp-' + shortid.generate();
    
    this.state.workExp.push({ id: workID })
    this.setState({ workExp: this.state.workExp });
  }
  
  removeWork = (i,e) => {
    e.preventDefault();
    const findIndex = this.state.workExp[i];
    
    this.state.workExp.splice(i,1)
    this.setState({ workExp: this.state.workExp });	
  }
  
  
  workChange = (index) => (e) => {
    
    this.props.update(index, e)
    console.log(e.target.value)
    //this.state.workExp[index][e.target.name] = e.target.value
    //this.setState({ workExp: this.state.workExp })
    
  }
  
  render() {
    console.log(this.state)
    return (
      <div id="detail">
        <h1>{this.state.name}</h1>
        <p>ID: {this.state._id}</p>
        <p>Created: {this.state.createdDate}</p>
        <p>Updated: {this.state.updatedDate}</p>
        
        <div className="container">
          <form onSubmit={this.onSubmit} >
          
          <PersonalDetails update={this.formUpdate} persdetails={this.state.persdetails} />
          <WorkRepeater update={this.repeatFormUpdate} workExp={this.state.workExp} removeWork={this.removeWork} pushWork={this.pushWork} descUpdate={this.repeatFormDesc} />
          
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


