/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
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
    const addNewBtn =
      <button className="btn__add-new" >
        <Link to={`/tracker/new`} >
          <Icon name="plus square" color="green" />
        </Link>
      </button>

    return (
      <div id="tracker">
        <h1>Application tracking {addNewBtn}</h1>
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
