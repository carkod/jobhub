/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Checkbox, Form, Header, Input, Segment } from 'semantic-ui-react';
import { auth } from '../actions/login';
import Notifications from './Notification';


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
        if (d.id.token) {
          const token = JSON.stringify(d.id.token);
          localStorage.setItem('token', token);
          this.setState({ isAuthenticated: true, redirectToReferrer: true });
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

  componentWillUnmount() {

  }


  render() {
    const { isAuthenticated } = this.state;
    if (isAuthenticated) {
      return <Redirect to='/home' />;
    } else {

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


}

function mapStateToProps(state, props) {
  return {
    // notification: state.notification,
    authentication: state.authentication,
    isAuthenticated: props.isAuthenticated,
  }
}

export default connect(mapStateToProps, { auth })(Login);