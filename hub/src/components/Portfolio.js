/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchPortfolio, saveProject, deleteProject } from '../actions/project';
import NewProject from './NewProject';
import SysMessage from './SysMessage';

class Portfolio extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      portfolio: props.portfolio
    };
    //(this.triggerDescChange = this.triggerDescChange.bind(this);
  }

  componentDidMount = () => {
    console.log(this.props)
    this.props.fetchProjects();
  }
  
  componentWillReceiveProps = (props) => {
    console.log(props)
    this.setState({portfolio: props.portfolio})    
  }
 
  
  render() {
    const {portfolio} = this.state;
    console.log(this.state)
    const list =
    portfolio.map((cv, i) => ({
      key: cv._id,
      //active: this.state.openAccordion,
      title: (
        <span color={this.state.savedID === cv._id ? 'red' : 'inherit' }>{cv.name}</span>
      ),
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
            <Button onClick={this.handleCopy} secondary>Copy</Button>
            <Button onClick={this.handleDelete} negative>Delete</Button>
          </div>
        </div>
      ),
    }));
    
    let renderList = <Accordion onTitleClick={(e, index) => this.setState({ activeIndex:this.state.activeIndex === index ? -1 : index })} panels={list} styled fluid />
    
    return (
      <div id="portfolio" className="">
        <h1>Section - All projects <NewProject sysmessage={({savedID, savedName}) => {this.setState({ savedID: savedID, savedName: savedName}); this.props.fetchProjects()}} /></h1>
        {/*<SysMessage messages={this.state} />*/}
        <div className="listItem">
          {portfolio ? renderList : 'Loading projects...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
    return {
      portfolio: state.portfolio
    }
}

export default connect(mapStateToProps, { saveProject, fetchPortfolio, deleteProject })(Portfolio);




