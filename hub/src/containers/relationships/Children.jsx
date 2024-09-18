import produce from "immer";
import shortid from 'shortid';
import React, { Component } from 'react';
import { Button, Form, Icon, Input, List } from 'semantic-ui-react';

class Children extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newChild: '',
      children: props.children,
      singLabel: props.singLabel
    };
  }

  componentDidUpdate = (p) => {
    if (this.props.children !== p.children) this.setState({
      children: this.props.children
    })
  }

  handleChange = i => (e) => {
    e.preventDefault();    
    this.setState(produce(draft => {
      draft.children[i][e.target.name] = e.target.value;
    }));
  }

  newChild = e => {
    const { value } = e.target;
    this.setState({ newChild: value })
  }

  addNew = () => {
    const newObj = {
      rank: '',
      key: shortid.generate(),
      text: this.state.newChild,
      value: this.state.newChild.replace(/\s/g, '-').toLowerCase(),
    }
    this.setState(produce(draft => {
      draft.children = [...draft.children, newObj];
    }));
  }

  removeChild = i => (e) => {
    this.setState(produce(draft => {
      draft.children = draft.children.filter((x, j) => j !== i);
    }));
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.children)
  }

  render() {
    const { children, singLabel } = this.state;
    const newButton = (singLabel) => <button className='btn' onClick={this.addNew}>Add New</button>
    return (
      <>
      <List relaxed>{'children: '}
        <Input icon='tags' iconPosition='left' label={{ tag: true, content: newButton(singLabel) }} labelPosition='right' placeholder={`New ${singLabel}`} onChange={this.newChild} value={this.state.newChild} />
        <List.Item>
          {children.length > 0 && children.map((it, i) =>
            <Form.Group key={it.key} widths="equal">
              <Button onClick={this.removeChild(i)} color='red' icon><Icon name='remove' /></Button>
              <Input label={'Text: '} name="text" onChange={this.handleChange(i)} value={children[i].text} />
              <Input label={'Value: '} name="value" onChange={this.handleChange(i)} value={children[i].value} />
              <Input label={'Rank: '} name="rank" onChange={this.handleChange(i)} value={children[i].rank} />
            </Form.Group>
          )}
        </List.Item>
      </List>
      <br />
      <div className="buttons">
        <Button onClick={this.onSubmit} color='green'>Save</Button>
      </div>
      </>
    );
  }
}


export default Children;
