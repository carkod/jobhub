/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TrackingTable from './Table.js';
import { Button, Icon } from 'semantic-ui-react'

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  componentDidMount = () => {

  }

  render() {
    return (
      <div id="tracker">
        <h1>Application tracking</h1>
        <Button labelPosition="left" size="small">
								<Icon name="user" /> Add new
							</Button>
        {/*Three tabs: tracking table, add stage, contact book*/}
        <TrackingTable />
        
      </div>
    );
  }

}

const mapStateToProps = (state, props) => {
  return true
}


export default Tracker;
