/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { Icon, Button, Header, Input, Grid } from 'semantic-ui-react';

//import { saveProject, fetchPortfolio, uploadFile } from '../../actions/project';

class Links extends Component {

  constructor(props) {
    super(props);
    this.state = {
      links: props.links,
    }
  }
  
  componentDidMount = () => {
      if (!this.props) {
        this.setState({})    
      }
      
  }

  componentWillReceiveProps = (props) => {
    this.setState({links: props.links})
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  
  render() {
    const {links} = !!Object.keys(this.state).length ? this.state : this.props;
    const renderList = (links) => links.map((link, i) => 
          <Grid.Row columns={4} key={link.fileId}>
            <Grid.Column textAlign="center" width={4}>
              <button className="btn" onClick={this.deleteLink(i)}><Icon name="delete" className="red large"/></button>
            </Grid.Column>
            <Grid.Column width={6}>
              <input id="linkTitle" name="title" value={link.title} onChange={this.handleChange(i)}/>
            </Grid.Column>
            <Grid.Column width={6}>
              <input id="linkUrl" name="url" value={link.url} onChange={this.handleChange(i)}/>
            </Grid.Column>
            
          </Grid.Row>
          );
    
    const renderEmpty = 
        <Grid.Row columns={1} >
            <Grid.Column>
                No links were created
            </Grid.Column>
        </Grid.Row>;
        
    return (
      <div id="demos" className="links section">
        <Header sub>DEMO LINKS</Header>
        
        <Grid>
        {links ? renderList : renderEmpty}
        </Grid>
    </div>
    );
  }
}


export default Links;

