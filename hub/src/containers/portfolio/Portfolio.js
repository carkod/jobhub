/* eslint-disable */

import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Accordion, Button, Icon, List } from 'semantic-ui-react';
import shortid from 'shortid';
import { copyProject, deleteProject, fetchPortfolio, saveProject } from '../../actions/project';
import NewProject from './NewProject';

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

  componentDidUpdate = (props) => {
    this.setState({ portfolio: props.portfolio })
  }

  handleCopy = i => e => {
    e.preventDefault();
    const { portfolio } = this.state;
    let newCV = portfolio[i];
    if (portfolio) {
      this.props.copyProject(newCV).then(status => {
        this.props.fetchPortfolio();
      });
    }
  }

  handleDelete = () => {
    const getItem = this.props.portfolio[this.state.activeIndex],
      getID = getItem._id,
      getName = getItem.name;

    this.props.deleteProject(getID).then(cv => {
      this.setState({ openAccordion: false });
      this.props.fetchPortfolio();
    })

  }

  render() {
    const { portfolio } = this.state;
    const list =
      portfolio.map((proj, i) => ({
        key: proj._id || shortid.generate(),
        title: {
          content: (
            <span color={this.state.savedID === proj._id ? 'red' : 'inherit'}>{proj.name}</span>
          ),
        },
        content: {
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
                <Link className="ui primary button" to={`/portfolio/project/id=${proj._id}`}>Edit/View</Link>
                <Button onClick={this.handleCopy(i)} secondary>Copy</Button>
                <Button onClick={this.handleDelete} negative>Delete</Button>
              </div>
            </div>
          ),
        }

      }));

    let renderList = <Accordion onTitleClick={(e, { index }) => this.setState({ activeIndex: this.state.activeIndex === index ? -1 : index })} panels={list} styled fluid />

    return (
      <div id="portfolio" className="">
        <h1>Section - All projects <NewProject /></h1>
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

export default connect(mapStateToProps, { saveProject, fetchPortfolio, deleteProject, copyProject })(Portfolio);




