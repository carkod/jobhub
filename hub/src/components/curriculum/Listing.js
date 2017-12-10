/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import shortid from 'shortid';
import { fetchCVs, saveCV, deleteCV, copyCV } from '../../actions/cv';
import Detail from './Detail';
import AddNew from './AddNew';
import SysMessage from '../SysMessage';

class Listing extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  
  componentDidMount = () => {
    this.props.fetchCVs()
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({ cvs: props.cvs })
  }
  
  handleCopy = i => e => {
    e.preventDefault();
    const {cvs} = this.state;
    let newCV = cvs[i];
    delete newCV._id;
    if (cvs) {
      this.props.copyCV(newCV).then(status => {
          this.props.fetchCVs();
          //this.state.detail.messages.savedID = status.data._id;
          //this.setState({ messages })
        });
    }
  }

  handleDelete = () => {
    const getItem = this.props.cvs[this.state.activeIndex],
          getID = getItem._id,
          getName = getItem.name;
    this.props.deleteCV(getID).then(cv => {
      this.setState({ deletedID: cv.id, deletedName: getName });
      this.setState({ openAccordion: false  }); 
      this.props.fetchCVs();
    })
    
  }
   
  
  render() {
  const status = this.state;
  let renderList;
  if (this.props.cvs.length > 0) {
    const arrayList =
    this.props.cvs.map((cv, i) => ({
      title: {
        key: shortid.generate(),  
        content: <span color={this.state.savedID === cv._id ? 'red' : 'inherit' }>{cv.name}</span>,
      },
      content: {
        key: shortid.generate(),
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
            <Button primary><Link style={{color: '#fff', display:'block'}} to={`/cv/id=${cv._id}`}>Edit/View</Link></Button>
            <Button onClick={this.handleCopy(i)} secondary>Copy</Button>
            <Button onClick={this.handleDelete} negative>Delete</Button>
          </div>
        </div>
        )
      }
     
    }));
    
    renderList = <Accordion onTitleClick={(e, {index}) => this.setState({ activeIndex:this.state.activeIndex === index ? -1 : index })} panels={arrayList} styled fluid />
    
    } else {
      renderList = <p>No CVs found</p>
    }
  
    
    return (
      <div id="list" className="">
        <h1>Section - CV <AddNew sysmessage={({savedID, savedName}) => {this.setState({ savedID: savedID, savedName: savedName}); this.props.fetchCVs()}} /></h1>
        <SysMessage messages={this.state} />
        <div className="listItem">
          {renderList}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state, props) {
  return {
    cvs: state.cvs
  }
}

export default connect(mapStateToProps, { saveCV, fetchCVs, deleteCV, copyCV })(Listing);
