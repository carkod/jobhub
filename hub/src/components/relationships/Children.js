/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, List, Icon, Accordion } from 'semantic-ui-react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
// import { fetchCats } from '../../actions/cats';

class Children extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cats: props.cats
    };
  }

  
  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (p) => {
     this.setState({
       cats: p.cats
     })
  }
  
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })    
  }
    
  render() {
    const {children} = this.props;
   
    return (
        <List.Item>
          {children.map((it, i) => 
            <Form.Group key={it.key} widths="equal">
              <Input label={'Text: '} name="text" onChange={this.props.onChange} value={it.text} />
              <Input label={'Value: '} name="value" onChange={this.props.onChange} value={it.value} />
            </Form.Group>
          )}
        </List.Item>  
    );
  }
}


export default Children;
