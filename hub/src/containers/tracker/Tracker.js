/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TrackingTable from './Table.js';

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
        <h1>Tracker list</h1>
        {/*Three tabs: tracking table, add stage, contact book*/}
        <TrackingTable />
        <Pagination
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={3}
        />
      </div>
    );
  }

}

const mapStateToProps = (state, props) => {
  return true
}


export default Tracker;
