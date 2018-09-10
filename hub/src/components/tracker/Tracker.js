/* eslint-disable */
import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
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
            <TrackingTable />
          </div>
        );
      }

}

const mapStateToProps = (state, props) => {
    return true
}

export default Tracker;
