/* eslint-disable */
import React, { Component } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import { Sidebar, Button, Header, Segment, Menu } from 'semantic-ui-react';

import fakeAuth from './fakeAuth';

//   const AuthButton = withRouter(
//     ({ history }) =>
//       fakeAuth.isAuthenticated ? (
//         <p>
//           Welcome!{" "}
//           <button
//             onClick={() => {
//               fakeAuth.signout(() => history.push("/"));
//             }}
//           >
//             Sign out
//           </button>
//         </p>
//       ) : (
//         <p>You are not logged in.</p>
//       )
//   );

class Login extends Component {
    state = {
    //   redirectToReferrer: false
    };
  
    login = () => {
        console.log('login clicked')
    //   fakeAuth.authenticate(() => {
    //     this.setState({ redirectToReferrer: true });
    //   });
    };
  
    render() {
    //   const { from } = this.props.location.state || { from: { pathname: "/" } };
    //   const { redirectToReferrer } = this.state;
  
    //   if (redirectToReferrer) {
    //     return <Redirect to={from} />;
    //   }
  
      return (
        <div>
          <p>You must log in to view the page at {/*from.pathname*/}</p>
          <Button onClick={this.login}>Log in</Button>
        </div>
      );
    }
  }

  export default Login;