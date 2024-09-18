/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react';

class Jobs extends Component {


  constructor(props) {
    super(props);

  }

  newApplication = () => {

  }

  render() {
    const applyButton =
      <button className="btn__add-new" >
        <Link to={`/new-tracker`} >
          <Icon name="plus square" color="green" />
        </Link>
      </button>
    
    return (
      <div id="job-board" className="page">
        <h1>Job board</h1>
      </div>
    );

  }


}

function mapStateToProps(state, props) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token || null
  }
}

export default connect(mapStateToProps)(Jobs);