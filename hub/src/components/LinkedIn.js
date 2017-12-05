/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';

import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { Icon, Button, Header } from 'semantic-ui-react';
import { authorization } from '../actions/linkedin';
import RichTextEditor from 'react-rte';


class LinkedIn extends Component {

  constructor(props) {
    super(props);
    let {cv, detail} = this.props;
    this.state = {
    };
  }

  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (props) => {
  }
  
  linkedin = (e) => {
      window.location = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78n5odk9nuiotg&redirect_uri=http%3A%2F%2Fcv-generator-carkod.c9users.io%3A8081%2Fapi%2Flinkedin&state=48295620';
  }
 
  
  render() {
    return (
      <div id="detail">
        <Button onClick={this.linkedin}>Push to LinkedIn</Button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  
}


//export default connect(mapStateToProps, { saveCV, fetchCVs })(Detail);
export default LinkedIn;

