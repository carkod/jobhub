/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Header, Input, Segment } from 'semantic-ui-react';
import { auth } from '../actions/login';
import Notifications from './Notification';
import { Redirect } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      isAuthenticated: false,
    };
  }

  login = (e) => {
    this.props.auth(this.state)
      .then((d) => {
        debugger;
        if (d.payload.token) {
          const token = JSON.stringify(d.payload.token);
          this.setState({ isAuthenticated: true, redirectToReferrer: true, token: token });

        }
        return false;
      })
      .catch(e => console.log(e));
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
    console.log(this.props)
    const { from } = this.props.location.state || { from: { pathname: '/' } }
debugger
    if (this.state.redirectToReferrer === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="login-centerer">
        <Notifications notifications={this.props.notifications} />
        <Segment id='login' compact>
          <Header as='h2'>Log in to access this application</Header>
          <Form>
            <Form.Field>
              <Input type='text' name='email' placeholder='Email' onChange={this.handleChange} />
              {/* <Label color='red' pointing active={false}>Email is incorrect</Label> */}
            </Form.Field>
            <Form.Field>
              <Input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
              {/* <Label color='red' pointing active={true}>Password is incorrect</Label> */}
            </Form.Field>
            <Form.Field>
              <Checkbox name="remember" label='Remember me' onChange={this.checkboxChange} />
            </Form.Field>
            <Button onClick={this.login} name="login">Log in</Button>
          </Form>
        </Segment>
      </div>
    );

  }


}

function mapStateToProps(state, props) {
  return {
    // notification: state.notification,
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token || null
  }
}

export default connect(mapStateToProps, { auth })(Login);