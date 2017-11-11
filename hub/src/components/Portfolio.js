/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
//import { fetchCVs, saveCV, deleteCV } from '../actions';
//import Detail from './Detail';

class Portfolio extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
    //(this.triggerDescChange = this.triggerDescChange.bind(this);
  }

  componentDidMount = () => {
    //this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (props) => {
    //merge fetched props with reducer initial state
    
  }
 
  
  render() {
    return (
      <div id="portfolio" className="">
        <h1>All projects</h1>
        {/*<SysMessage messages={this.state} />*/}
        <div className="listItem">
          Loading projects...
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


export default Portfolio;
//export default connect(mapStateToProps, { saveCV, fetchCVs, deleteCV })(Portfolio);
