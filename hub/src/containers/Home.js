import React, { Component } from 'react';
import { Grid, Button, Form } from 'semantic-ui-react';
import produce from "immer";
import { fetchSiteApi } from "../actions/site";
import { connect } from 'react-redux';

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      company: "",
      location: "",
      position: "",
      email: "",
      linkedin: "",
      github: "",
      stackoverflow: "",
    }
  }

  componentDidMount = () => {
    this.props.fetchSiteApi();
  }

  logout() {
    localStorage.removeItem("hubToken");
    window.location.reload();
  }

  handleChange = (e) => {
    this.setState(produce(draft => {
      draft[e.target.name] = e.target.value
    }))
  }

  onSubmit = () => {
    const content = this.state;

  }

  render() {
    return (
      <div className="home">
        <h1>This is Home</h1>
        <Button onClick={this.logout}>Log out</Button>

        <Form onSubmit={this.onSubmit} >
        <Grid>
          {Object.keys(this.state).map(item => {
            return (
              <Form.Field>
                <label className="u-uppercase">{item} </label>
                <input name={item} type="text" onChange={this.handleChange} value={this.state[item]} />
              </Form.Field>
            )
          })}
          
        </Grid>
        </Form>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return state

}

export default connect(mapStateToProps, { fetchSiteApi })(Detail);