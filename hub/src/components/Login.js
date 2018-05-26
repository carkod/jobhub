/* eslint-disable */
import React, { Component } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import { Label, Input, Button, Header, Segment, Menu, Form, Checkbox, Container } from 'semantic-ui-react';

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
  
    login = (e) => {
        console.log(this.state)
        
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    }

    handleChange = (e) => { 
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    checkboxChange = (e, data) => {
      this.setState({
        [data.name]: data.checked
      })
    }

  
    render() {
    //   const { from } = this.props.location.state || { from: { pathname: "/" } };
    //   const { redirectToReferrer } = this.state;
  
    //   if (redirectToReferrer) {
    //     return <Redirect to={from} />;
    //   }
      console.log(fakeAuth())
      return (
        <div className="login-centerer">
          <Segment id='login' compact>
            <Header as='h2'>You need to log in to see this application</Header>
            <Form>
              <Form.Field>
                <Input type='text' name='username' placeholder='Username' onChange={this.handleChange} />
                <Label color='red' pointing active={false}>Type in your username</Label>
              </Form.Field>
              <Form.Field>
                <Input type='password' name='password' placeholder='Password' onChange={this.handleChange}/>
                <Label color='red' pointing active={true}>Enter your password</Label>
              </Form.Field>
              <Form.Field>
                <Checkbox name="remember" label='Remember me' onChange={this.checkboxChange}/>
              </Form.Field>
              <Button onClick={this.login} name="login">Log in</Button>
            </Form>
          </Segment>
        </div>
      );
    }
  }

  export default Login;