/* eslint-disable */
import React, { Component } from 'react';
import { Link, Route, NavLink } from 'react-router-dom';
import { Label, Input, Button, Header, Segment, Menu, Form, Checkbox, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Notifications from './Notification';
import {authenticate} from '../actions/login';


class Login extends Component {
    state = {
    //   redirectToReferrer: false
    };
  
    login = (e) => {
        
      this.props.authenticate(this.state)
      .then((d) => {
        console.log(d)
        this.setState({ 
          redirectToReferrer: true });
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

function mapStateToProps (state, props) {
  
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, { authenticate })(Login);