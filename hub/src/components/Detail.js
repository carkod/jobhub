/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import { Icon, Button} from 'semantic-ui-react';


import { fetchCVs, saveCV } from '../actions';

import { WorkRepeater } from './Repeaters'; 

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

  
  pushWork = (e) => {
    e.preventDefault();
    console.log('Add work pushed')
    const newField = 'workRepeat-' + this.state.workRepeat.length;
    this.setState({ workRepeat: this.state.workRepeat.concat([newField]) })
  }
  
  removeWork = (e, work) => {
    e.preventDefault();
    const arrToRemove = work.indexOf(work);
    if( (arrToRemove != -1) && (work != 'workRepeat-0') ) {
    	this.setState({
    	  workRepeat: this.state.workRepeat.splice(arrToRemove, 1),
    	})
    }
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
          
          <div className="personal">
          {/* Personal details */}
            <label>Name</label>
            <input name="name" type="text" />  
          </div>
        
          <div className="work">
          <Button className="icon large" onClick={this.pushWork}><Icon className="green" name="add square"></Icon></Button>
          
            <WorkRepeater fields={this.state.workRepeat} onChange={this.onChange} removeWork={this.removeWork} />
          </div>
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


