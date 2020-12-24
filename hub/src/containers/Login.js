/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Header, Input, Segment } from 'semantic-ui-react';
import { auth } from '../actions/login';
import Notifications from '../components/Notification';

class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  login = (e) => {
    const { email, password } = this.state
    this.props.auth({ email, password })
      .then((d) => {
        const { pathname } = this.props.location.state.from
        this.props.history.push(pathname)
      })
      .catch(e => console.log(e));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  checkboxChange = (e, data) => {
    this.setState({ [data.name]: data.checked })
  }


  render() {
    return (
      <div className="login-centerer">
        <Notifications notifications={this.props.snackBarReducer} authNotification={this.state.isAuthenticated} />
        <Segment id='login' compact>
          <Header as='h2'>LOGIN FOR ACCESS</Header>
          <Form onSubmit={this.login}>
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
            <Button type='submit' name="login">Log in</Button>
          </Form>
        </Segment>
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

export default connect(mapStateToProps, { auth })(Login);