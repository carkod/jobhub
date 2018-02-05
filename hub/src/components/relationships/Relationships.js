/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, List, Icon, Accordion } from 'semantic-ui-react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { fetchCats } from '../../actions/cats';
import Children from './Children';

class Relationships extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cats: props.cats
    };
  }

  
  componentDidMount = () => {
    this.props.fetchCats()
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
  
  addChild = e => {
    console.log(e.target.name)
    console.log(e.target.value)
    /*this.setState({
      [e.target.name]: e.target.value
    })*/
  }
    
  onSubmit = (e) => {
    
    // this.props.saveCats({ name })
    
  }

  render() {
    const {cats} = this.props;
    const newButton = ({singLabel}) => <button onClick={this.addChild} className='btn'>Add New</button>
    let renderList;
    if (cats.length > 0) {
      const arrayList =
      cats.map((cv, i) => ({
        title: {
          key: cv._id || shortid.generate(),  
          content: <span color={this.state.savedID === cv._id ? 'red' : 'inherit' }>{cv.title}</span>,
        },
        content: {
          key: shortid.generate(),
          content: (
            <div className="metadata">
            <div className="meta-content">
              <List horizontal relaxed>
                <List.Item>_id: {cv._id}</List.Item>
                <List.Item>singLabel: <Input value={cv.singLabel} name="singLabel" onChange={this.handleChange} /></List.Item>
                <List.Item>title: <Input value={cv.title} name="title" onChange={this.handleChange} /></List.Item>
                
              </List>
              <List relaxed>{'children: '}
              <Input icon='tags' iconPosition='left' label={{ tag: true, content: newButton(cv) }} labelPosition='right' placeholder={`New ${cv.singLabel}`} value={this.addChild} />
                <Children children={cv.children} onChange={this.handleChange}/> 
              </List>
            </div>
            {/*<div className="buttons">
              <Button primary><Link style={{color: '#fff', display:'block'}} to={`/cv/id=${cv._id}`}>Edit/View</Link></Button>
              <Button onClick={this.handleCopy(i)} secondary>Copy</Button>
              <Button onClick={this.handleDelete} negative>Delete</Button>
            </div>*/}
          </div>
          )
        }
       
      }));
      
    renderList = <Accordion onTitleClick={(e, {index}) => this.setState({ activeIndex:this.state.activeIndex === index ? -1 : index })} panels={arrayList} styled fluid />
    
    } else {
      renderList = <p>No categories found</p>
    }
    
    return (
      <div id="list" className="">
        <Header as="h1">Positions</Header>
        {renderList}
        
      </div>
    );
  }
}

function mapStateToProps (state, props) {
  return {
    cats: state.cats
  }
}


export default connect(mapStateToProps, { fetchCats })(Relationships);
