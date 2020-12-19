/* eslint-disable */

import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';


class LinkedIn extends Component {

  constructor(props) {
    super(props);
    let {cv, detail} = this.props;
    this.state = {
    };
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


//export default connect(mapStateToProps, { saveCvApi, fetchCVs })(Detail);
export default LinkedIn;

