/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import shortid from 'shortid';
import { Icon, Button} from 'semantic-ui-react';
import { fetchCVs, saveCV, retrieveOne } from '../actions';

import PersonalDetails from './PersonalDetails'; 
import WorkRepeater from './WorkRepeater'; 

class Detail extends Component {
  
  state = {
    _id: shortid.generate(),
    workExp: [
      {
        id: 'workExp-0'
      }
    ]
  }

  
  formUpdate = ( e ) => {
    
    const persdetails = Object.assign({}, this.state.persdetails, {
        [e.target.name]: e.target.value        
    })
    this.setState({ persdetails })
    
  }
  
   repeatFormUpdate = ({ workExp }) => {
    
    console.log(workExp)
    this.setState({ workExp })
  }
    
  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveCV(this.state)
    
  }

  
  render() {
    console.log(this.state)
    return (
      <div id="detail">
        <h1>This is Detail</h1>
        
        <div className="container">
          <form onSubmit={this.onSubmit} >
          
          <PersonalDetails update={this.formUpdate} />
          <WorkRepeater update={this.repeatFormUpdate} fields={this.state.workExp} removeWork={this.removeWork} />
          
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
  return {
    cvs: state.cvs
  }
}


export default connect(mapStateToProps, { saveCV, fetchCVs })(Detail);


