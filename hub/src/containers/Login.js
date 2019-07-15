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
      token: ''
    };
  }

  login = (e) => {
    console.log(this.props, this.state)
    const { email, password } = this.state
    this.props.auth({ email, password })
      .then((d) => {
        if (d.payload.token) {
          const token = JSON.stringify(d.payload.token)
          localStorage.setItem('hubToken', token);
          this.setState({ isAuthenticated: true, token: token });
          const { pathname } = this.props.location.state.from
          this.props.history.push('/')
        }
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
    return (
      <div className="login-centerer">
        <Notifications notifications={this.props.notifications} authNotification={this.state.isAuthenticated} />
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
    // notification: state.notification,
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token || null
  }
}

export default connect(mapStateToProps, { auth })(Login);