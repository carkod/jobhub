/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Header, Input, Label, Segment } from 'semantic-ui-react';
import { auth } from '../actions/login';
import Notifications from './Notification';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //   redirectToReferrer: false
    };
  }

  login = (e) => {
    console.log('logging', this.state);
    this.props.auth(this.state)
      .catch(e => console.log(e))
      .then((d) => {
        console.log(d)
        console.log(d)
        const token = JSON.stringify(d.token);
        localStorage.setItem('token', token);
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

    return (
      <div className="login-centerer">
        <Notifications notifications={this.props.notifications} />
        <Segment id='login' compact>
          <Header as='h2'>You need to log in to access this application</Header>
          <Form>
            <Form.Field>
              <Input type='text' name='email' placeholder='Email' onChange={this.handleChange} />
              <Label color='red' pointing active={false}>Email is incorrect</Label>
            </Form.Field>
            <Form.Field>
              <Input type='text' name='username' placeholder='Username' onChange={this.handleChange} />
              <Label color='red' pointing active={false}>Username is invalid</Label>
            </Form.Field>
            <Form.Field>
              <Input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
              <Label color='red' pointing active={true}>Password is incorrect</Label>
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
    notification: state.notification,
    authentication: state.authentication,
  }
}

export default connect(mapStateToProps, { auth })(Login);