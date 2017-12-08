/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchCLs, saveCL, deleteCL } from '../../actions/cl';
import NewCL from './NewCL';
import Metainfo from './Metainfo';
import SysMessage from './SysMessage';

class CoverLetters extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cls: props.cls
    };
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchCLs();
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({cls: props.cls})    
  }
 
  handleCopy = () => {
    
  }
 
  handleDelete = () => {
    const getItem = this.props.cls[this.state.activeIndex],
          getID = getItem._id,
          getName = getItem.name;
          
    this.props.deleteCL(getID).then(cv => {
      this.setState({ deletedID: cv.id, deletedName: getName });
      this.setState({ openAccordion: false  }); 
      this.props.fetchCLs();
    })
    
  }
  
  render() {
    const {cls} = this.state;
    const list =
    cls.map((letter, i) => ({
      key: letter._id,
      //active: this.state.openAccordion,
      title: (
        <span color={this.state.savedID === letter._id ? 'red' : 'inherit' }>{letter.name}</span>
      ),
      content: (
        <div className="metadata">
          <div className="meta-content">
            <List horizontal relaxed>
              <List.Item><Icon fitted name='id card' /> {letter._id || 'N/A'}</List.Item>
              <List.Item><Icon fitted name='checked calendar' /> {moment(letter.updateDate).format('Do MMMM YYYY') || 'N/A'}</List.Item>
              <List.Item><Icon fitted name='clock' /> {moment(letter.createdDate).format('Do MMMM YYYY') || 'N/A'}</List.Item>
              
              <List.Item><Icon fitted name='briefcase' /> {letter.cats ? letter.cats.position : 'N/A'}</List.Item>
              <List.Item><Icon fitted name='talk' /> {letter.cats ? letter.cats.locale : 'N/A'}</List.Item>
              <List.Item><Icon fitted name='globe' /> {letter.cats ? letter.cats.cvCountry : 'N/A'}</List.Item>  
            </List>
          </div>
          <div className="buttons">
            <Button primary><Link style={{color: '#fff', display:'block'}} to={`/coverletters/id=${letter._id}`}>Edit/View</Link></Button>
>>>>>>> 13dc922440d0b1303498c522307615456bfd9ae6
            <Button onClick={this.handleCopy} secondary>Copy</Button>
            <Button onClick={this.handleDelete} negative>Delete</Button>
          </div>
        </div>
      ),
    }));
    
    let renderList = <Accordion onTitleClick={(e, index) => this.setState({ activeIndex:this.state.activeIndex === index ? -1 : index })} panels={list} styled fluid />
    
    return (
      <div id="cls" className="">
        <h1>Section - All Cover Letters <NewCL sysmessage={({savedID, savedName}) => {this.setState({ savedID: savedID, savedName: savedName}); this.props.fetchCLs()}} /></h1>
        {/*<SysMessage messages={this.state} />*/}
        <div className="listItem">
          {cls ? renderList : 'Loading cover letters...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
    return {
      cls: state.coverLetters
    }
}

export default connect(mapStateToProps, { saveCL, fetchCLs, deleteCL })(CoverLetters);




