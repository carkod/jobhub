/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchPortfolio, saveProject, deleteProject } from '../../actions/project';
import NewProject from './NewProject';
import Metainfo from './Metainfo';
import SysMessage from './SysMessage';

class Portfolio extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      portfolio: props.portfolio
    };
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchPortfolio();
  }
  
  componentWillReceiveProps = (props) => {
    this.setState({portfolio: props.portfolio})    
  }
 
  handleCopy = () => {
    
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
    const {portfolio} = this.state;
    const list =
    portfolio.map((proj, i) => ({
      key: proj._id,
      //active: this.state.openAccordion,
      title: (
        <span color={this.state.savedID === proj._id ? 'red' : 'inherit' }>{proj.name}</span>
      ),
      content: (
        <div className="metadata">
          <div className="meta-content">
            <List horizontal relaxed>
              <List.Item><Icon fitted name='id card' /> {proj._id || 'N/A'}</List.Item>
              <List.Item><Icon fitted name='checked calendar' /> {moment(proj.updateDate).format('Do MMMM YYYY') || 'N/A'}</List.Item>
              <List.Item><Icon fitted name='clock' /> {moment(proj.createdDate).format('Do MMMM YYYY') || 'N/A'}</List.Item>
              
              <List.Item><Icon fitted name='briefcase' /> {proj.cats ? proj.cats.position : 'N/A'}</List.Item>
              <List.Item><Icon fitted name='talk' /> {proj.cats ? proj.cats.cvLang : 'N/A'}</List.Item>
              <List.Item><Icon fitted name='globe' /> {proj.cats ? proj.cats.cvCountry : 'N/A'}</List.Item>  
            </List>
          </div>
          <div className="buttons">
            <Button primary><Link style={{color: '#fff', display:'block'}} to={`/portfolio/project/id=${proj._id}`}>Edit/View</Link></Button>
            <Button onClick={this.handleCopy} secondary>Copy</Button>
            <Button onClick={this.handleDelete} negative>Delete</Button>
          </div>
        </div>
      ),
    }));
    
    let renderList = <Accordion onTitleClick={(e, index) => this.setState({ activeIndex:this.state.activeIndex === index ? -1 : index })} panels={list} styled fluid />
    
    return (
      <div id="portfolio" className="">
        <h1>Section - All projects <NewProject sysmessage={({savedID, savedName}) => {this.setState({ savedID: savedID, savedName: savedName}); this.props.fetchPortfolio()}} /></h1>
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




