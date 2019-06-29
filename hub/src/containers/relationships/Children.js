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
        newChild: '',
        children: props.children,
        singLabel: props.singLabel
    };
  }

  
  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (p) => {
    console.log(p)
     this.setState({p})
  }
  
  handleChange = i => (e) => {
    e.preventDefault();
    const {children} = this.state;
    children[i][e.target.name] = e.target.value;
    this.setState({children});
    this.props.onChange(children);
  }
  
  newChild = e => {
    // const {singLabel} = cv;
    const {value} = e.target;
    this.setState({newChild: value})
    
  }
  
  onSubmit = () => {
    const {children} = this.state;
    const newObj = {
        rank: '',
        key: shortid.generate(),
        text: this.state.newChild,
        value: this.state.newChild.replace(/\s/g, '-').toLowerCase(),
    }
    this.state.children.push(newObj)
    this.setState({children});
    this.props.newChild(this.state.children)
  }
  
  removeChild = i => (e) => {
    const {children} = this.state;
    this.setState({children});
    this.props.newChild(this.state.children)
  }
    
  render() {
    const {children, singLabel} = this.state || this.props;
    const newButton = (singLabel) => <button className='btn' onClick={this.onSubmit}>Add New</button>
    return (
        <List relaxed>{'children: '}
            <Input icon='tags' iconPosition='left' label={{ tag: true, content: newButton(singLabel) }} labelPosition='right' placeholder={`New ${singLabel}`} onChange={this.newChild} value={this.state.newChild}/>
            <List.Item>
              {children.map((it, i) => 
                <Form.Group key={it.key} widths="equal">
                <Button onClick={this.removeChild(i)} color='red' icon><Icon name='remove' /></Button>
                  <Input label={'Text: '} name="text" onChange={this.handleChange(i)} value={children[i].text} />
                  <Input label={'Value: '} name="value" onChange={this.handleChange(i)} value={children[i].value} />
                  <Input label={'Rank: '} name="rank" onChange={this.handleChange(i)} value={children[i].rank} />
                </Form.Group>
              )}
            </List.Item>  
        </List>
    );
  }
}


export default Children;
