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
    workExp: [
      {
        id: 'workExp-0',
        date:'',
        position:'',
      }
    
    ],
  }

  
  componentDidMount = () => {
    //this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (nextProps) => {
     this.setState({
       name: nextProps.name,
     });
    }
  
  onChange = (e, work) => {
    let changedWork = Object.assign({}, this.state.workExp, {
      id: work.id,
      [e.target.name]: e.target.value,
    });
    this.setState({ changedWork });
    
    }
    
  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveCV(this.state)
    
  }

  
  pushWork = (e) => {
    e.preventDefault();
    
    const workID = 'workExp-' + this.state.workExp.length;
    this.state.workExp.push({ id: workID });
    let newWork = Object.assign({}, this.state.workExp, {
      id: this.state.workExp.id,
      date: this.state.workExp.date,
      position: this.state.workExp.position,
    });
    this.setState({ newWork });
    
  }
  
  removeWork = (e, work) => {
    e.preventDefault();
    
    if( work != 'workExp-0' ) {
    const indx = this.state.workExp.findIndex((el) => el === work)
    this.state.workExp.splice(indx, 1);
    let removedWork = Object.assign({}, this.state.workExp, {
      id: this.state.workExp.id,
      date: this.state.workExp.date,
      position: this.state.workExp.position,
    });
    this.setState({ removedWork })
    	
    }
    
  }
  

  render() {
    return (
      <div id="detail">
        <h1>This is Detail</h1>
        
        <div className="App-intro">
          <form onSubmit={this.onSubmit} >
          
          <div className="personal">
            <label>Name</label>
            <input name="name" type="text" onChange={this.onChange} />  
          </div>
        
          <div className="work">
          <Button className="icon large" onClick={this.pushWork}><Icon className="green" name="add square"></Icon></Button>
          
            <WorkRepeater fields={this.state.workExp} onChange={this.onChange} removeWork={this.removeWork} />
          </div>
          
          <Button type="submit" value="Save">Save</Button>
          
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


