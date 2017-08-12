/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCVs, saveCV } from '../actions';


class List extends Component {
  
  state = {
    name: this.props.name ?  this.props.name : null,  
    
  }

  
  componentDidMount = () => {
    this.props.fetchCVs();
    
  }
  
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
     this.setState({
       name: nextProps.name,
     });
    }
  
  onChange = (e) => {
      this.setState({ 
        name: e.target.value
        
      });
    }
    
  onSubmit = (e) => {
    const name = this.state.name;
    
    this.props.saveCV({ name })
    
  }

  render() {
    return (
      <div id="list" className="">
        <Header as="h1">This is List</Header>
        <div className="App-intro">
          <Form onSubmit={this.onSubmit}>
            <Form.Group widths='equal'>
              <input placeholder='First Name' onChange={this.onChange} />
              <Button type='submit'>Submit</Button>
            </Form.Group>
          </Form>
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


export default connect(mapStateToProps, { saveCV, fetchCVs })(List);
