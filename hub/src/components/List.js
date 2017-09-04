/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchCVs, saveCV } from '../actions';
import Detail from './Detail';
import Newcv from './Newcv';

class Listing extends Component {
  
  state = {}

  
  componentDidMount = () => {
    this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (nextProps) => {
    //console.log(nextProps)
     this.setState({
       name: nextProps.name,
     });
    }
  
  newcvChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  newcvSave = () => {
    console.log(this.state)
    const cv = Object.assign({}, this.state, {
      _id: '',
      name: this.state.name
    });
    this.props.saveCV({
      name: this.state.name
    })
    console.log()
    
  }
    
  render() {
    
    const emptyList = ['No CVs found'];
    const cvList = this.props.cvs.map((cv, i) => ({
      key: cv._id,
      title: cv.name,
      content: (
        <div className="metadata">
          <div className="meta-content">
            <List horizontal relaxed>
              <List.Item><Icon fitted name='id card' /> {cv._id || 'N/A'}</List.Item>
              <List.Item><Icon fitted name='checked calendar' /> {moment(cv.updateDate).format('Do MMMM YYYY') || 'N/A'}</List.Item>
              <List.Item><Icon fitted name='clock' /> {moment(cv.createdDate).format('Do MMMM YYYY') || 'N/A'}</List.Item>
                
              <List.Item><Icon fitted name='briefcase' /> {cv.cats ? cv.cats.position : 'N/A'}</List.Item>
              <List.Item><Icon fitted name='talk' /> {cv.cats ? cv.cats.cvLang : 'N/A'}</List.Item>
              <List.Item><Icon fitted name='globe' /> {cv.cats ? cv.cats.cvCountry : 'N/A'}</List.Item>  
            </List>
          </div>
          <div className="buttons">
            <Button primary>Edit/View</Button>
            <Button secondary>Copy</Button>
            <Button negative>Delete</Button>
          </div>
        </div>
      ),
    }))
   
    return (
      <div id="list" className="">
        <h1>Section - CV <Newcv save={this.newcvSave} change={this.newcvChange} /></h1>
        <div className="listItem">
          <Accordion panels={ this.props.cvs ? cvList : emptyList} styled fluid/>          
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


export default connect(mapStateToProps, { saveCV, fetchCVs })(Listing);
