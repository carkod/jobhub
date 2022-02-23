import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Checkbox, Form, Header, Input, Segment } from 'semantic-ui-react';
import { userLogin } from '../actions/login';
import Notifications from '../components/Notification';
import { checkValue, getToken, withRouter } from '../utils';
class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount = () => {
    const isAuthenticated = getToken();
    this.setState({
      isAuthenticated: !!isAuthenticated
    });
  }

  login = (e) => {
    const { email, password } = this.state;
    this.props.userLogin(email, password);
    const token = getToken();
    if (checkValue(token)) {
      if (this.props.router.location.state?.from && this.props.router.location.state.from !== "/") {
        this.props.router.navigate(this.props.router.location.state.from);
      } else {
        this.props.router.navigate("/cv")
      }
 
    }
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
            </Form.Field>
            <Form.Field>
              <Input type='password' name='password' placeholder='Password' onChange={this.handleChange} />
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


export default compose(withRouter, connect(() => {}, { userLogin }))(Login);