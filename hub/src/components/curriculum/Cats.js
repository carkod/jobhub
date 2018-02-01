/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCats, saveCats } from '../../actions/cv';


class Positions extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.listing = this.listing.bind(this);
  }

  
  componentDidMount = () => {
    this.props.fetchCats();
    this.props.SaveCats();
  }
  
  componentWillReceiveProps = (nextProps) => {
     
  }
  
  onChange = (e) => {
      
    }
    
  onSubmit = (e) => {
    
    // this.props.saveCats({ name })
    
  }

  render() {
    return (
      <div id="list" className="">
        <Header as="h1">This is Detail</Header>
        <p>Should use this page for editing CV</p>
        <p>Use List to add CV and come to this page</p>
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


export default connect(mapStateToProps, { saveCats, fetchCats })(Positions);
