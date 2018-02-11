/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import shortid from 'shortid';
import { fetchCLs, saveCL, deleteCL, copyCL } from '../../actions/cl';
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
 
  handleCopy = i => e => {
    e.preventDefault();
    const {cls} = this.state;
    let newCL= cls[i];
    delete newCL._id;
    if (cls) {
      this.props.copyCL(newCL).then(status => {
          this.props.fetchCLs();
          //this.state.detail.messages.savedID = status.data._id;
          //this.setState({ messages })
        });
    }
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
    const {cls} = !!Object.keys(this.state).length ? this.state : this.props;
    const list =
    cls.map((letter, i) => ({
      title: {
        content: <span color={this.state.savedID === letter._id ? 'red' : 'inherit' }>{letter.name}</span>,
        key: shortid.generate(),
      },
      content: {
        content: (
          <div className="metadata" >
            <div className="meta-content">
              <Segment.Group>
                  <Segment.Group horizontal>
                    <Segment><Icon fitted name='id card' /> {letter._id || 'N/A'}</Segment>
                    <Segment><Icon fitted name='checked calendar' /> {moment(letter.updateDate).format('Do MMMM YYYY') || 'N/A'}</Segment>
                    <Segment><Icon fitted name='clock' /> {moment(letter.createdDate).format('Do MMMM YYYY') || 'N/A'}</Segment>
                  </Segment.Group>
                  <Segment.Group horizontal>
                    <Segment><Icon fitted name='briefcase' /> {letter.cats ? letter.cats.position : 'N/A'}</Segment>
                    <Segment><Icon fitted name='talk' />{letter.cats ? letter.cats.locale : 'N/A'}</Segment>
                    <Segment><Icon fitted name='globe' />{letter.cats ? letter.cats.cvCountry : 'N/A'}</Segment>
                  </Segment.Group>
              </Segment.Group>    
            </div>
            <br />
            <div className="buttons">
              <Button primary><Link style={{color: '#fff', display:'block'}} to={`/coverletters/id=${letter._id}`}>Edit/View</Link></Button>
              <Button onClick={this.handleCopy(i)} secondary>Copy</Button>
              <Button onClick={this.handleDelete} negative>Delete</Button>
            </div>
          </div>
        ),
        key: shortid.generate(),
  },
}));
    
    let renderList = <Accordion onTitleClick={(e, {index}) => this.setState({ activeIndex:this.state.activeIndex === index ? -1 : index })} panels={list} styled fluid />
    
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

export default connect(mapStateToProps, { saveCL, fetchCLs, deleteCL, copyCL })(CoverLetters);




