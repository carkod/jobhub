/* eslint-disable */

import React, { Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import shortid from 'shortid';

class Links extends Component {

  constructor(props) {
    super(props);
    this.state = {
      links: [],
    }
  }

  componentDidMount = () => {
  }

  componentDidUpdate = (props) => {
    if (this.props.links !== props.links) this.setState({ links: this.props.links })
  }

  handleChange = (i) => (e) => {
    const { links } = this.state;
    links[i][e.target.name] = e.target.value;
    this.setState({ [e.target.name]: e.target.value });
    this.props.onChange(this.state)
  }

  pushLink = (e) => {
    e.preventDefault();
    let { links } = this.state;
    const newLinkState = {
      id: 'link-' + shortid.generate(),
      title: '',
      url: '',
    }
    links.push(newLinkState);
    this.setState({ links })
  }

  removeLink = (i) => (e) => {
    e.preventDefault();
    const { links } = this.state;
    links.splice(i, 1)
    this.setState({ links });
  }

  render() {
    const renderList = this.state.links.map((link, i) =>
      <Grid.Row columns={4} key={link.id}>
        <Grid.Column textAlign="center" width={2}>
          {i > -1 ? <button className="btn btn-close-repeat" onClick={this.removeLink(i)}><Icon className="red large" name="window close" ></Icon></button> : ''}
        </Grid.Column>
        <Grid.Column width={7}>
          <label htmlFor="title">Title </label>
          <input id="linkTitle" name="title" value={link.title} onChange={this.handleChange(i)} />
        </Grid.Column>
        <Grid.Column width={7}>
          <label htmlFor="url">URL </label>
          <input id="linkUrl" name="url" value={link.url} onChange={this.handleChange(i)} />
        </Grid.Column>
      </Grid.Row>
    );

    const renderEmpty =

      <Grid.Row columns={1} >
        <Grid.Column>
          No links were created
            </Grid.Column>
      </Grid.Row>
      ;

    return (
      <div id="demos" className="links section">
        <Header sub>
          <span>DEMO LINKS</span>
          <button className="btn" onClick={this.pushLink}><Icon className="green" name="add square"></Icon></button>

        </Header>
        <br />
        <Grid>
          {this.state.links ? renderList : renderEmpty}
        </Grid>
      </div>
    );
  }
}


export default Links;

