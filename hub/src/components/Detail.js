/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { fetchCVs, saveCV } from '../actions';

import PersDetails from './forms/Personaldetails';
import WorkRepeater from './forms/WorkRepeater';

class Detail extends Component {
  
  state = {
    name: this.props.name ?  this.props.name : null,  
    workRepeat: ['workRepeat-0'],
  }

  
  componentDidMount = () => {
    //this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (nextProps) => {
     this.setState({
       name: nextProps.name,
     });
    }
  
  onChange = props => {
      /*.setState({ 
        [e.target.name]: e.target.value
      });*/
      console.log(props)
    }
    
  onSubmit = (e) => {
    const { name } = this.state;
    
    this.props.saveCV({ name })
    //console.log(this.props)
    
  }
  
  repeater = () => {
    const newField = 'workRepeat-' + this.state.workRepeat.length;
    this.setState({ workRepeat: this.state.workRepeat.concat([newField]) })
  }
  
  /*closeField = (field) => {
    if (this.state.workRepeat.length > 0) {
      this.setState({ workRepeat: this.state.workRepeat.splice(field) });  
    }
    console.log(this.state.workRepeat)
  }*/

  render() {
    return (
      <div id="detail">
        <h1>This is Detail</h1>
        
        <div className="App-intro">
          <form onSubmit={this.onSubmit} >
            <PersDetails onChange={this.onChange} />
            <WorkRepeater onChange={this.onChange} />
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


