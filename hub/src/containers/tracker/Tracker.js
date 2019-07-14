/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Dropdown } from 'semantic-ui-react';
import TrackingTable from './Table.js';
import { showArchiveOptions, filterRoleOptions }  from './Tracker.data';

class Tracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showArchive: false,
    };

  }

  componentDidMount = () => {
  }

  handleChangeFilter = (e, data) => {
    this.setState({ [data.name]: data.value })
  }

  render() {
    const addNewBtn =
      <button className="btn__add-new" >
        <Link to={`/new-tracker`} >
          <Icon name="plus square" color="green" />
        </Link>
      </button>

    return (
      <div id="tracker">
        <h1>Application tracking {addNewBtn}</h1>
        {/*Three tabs: tracking table, add stage, contact book*/}
        <Dropdown name='showArchive' options={showArchiveOptions} onChange={this.handleChangeFilter} defaultValue={this.state.showArchive}/>
        {/* <Dropdown name='filterRoles' options={filterRoleOptions} onChange={this.handleChangeFilter} defaultValue={this.state.filterRoleOptions}/> */}
        <TrackingTable {...this.props} showArchive={this.state.showArchive} />

      </div>
    );
  }

}

const mapStateToProps = (state, props) => {
  return state
}


export default Tracker;
