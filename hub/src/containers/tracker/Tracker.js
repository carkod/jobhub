/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Dropdown } from 'semantic-ui-react';
import TrackingTable from './Table.js';
import shortid from 'shortid'

const showArchiveOptions = [
  {
    key: shortid.generate(),
    text: 'Show active applications',
    value: false,
    placeholder: 'Active or closed',
  },
  {
    key: shortid.generate(),
    text: 'Show all applications',
    value: true,
    placeholder: 'Active or closed',
  },
]

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
        <TrackingTable {...this.props} showArchive={this.state.showArchive} />

      </div>
    );
  }

}

const mapStateToProps = (state, props) => {
  return state
}


export default Tracker;
