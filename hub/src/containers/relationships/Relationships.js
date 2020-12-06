/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, List, Icon, Accordion } from 'semantic-ui-react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { fetchCats, saveCats } from '../../actions/cats';
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
  
  componentDidUpdate = (p) => {
     this.setState({
       cats: p.cats
     })
  }
  
  handleChange = (e) => {
    e.preventDefault();
    const {activeIndex, cats} = this.state;
    cats[activeIndex][e.target.name] = e.target.value;
    this.setState({cats})    
  }
  
  handleChildren = children => {
    this.setState({children})
  }
  
  changeChildren = i => e => {
    const {activeIndex, cats} = this.state;
    cats[activeIndex].children[i][e.target.name] = e.target.value
    this.setState({cats})
  }
  
  save = (e) => {
    const {activeIndex, cats} = this.state;
    this.props.saveCats({ cats }).then(res => console.log(res))
  }

  render() {
    const {cats} = this.state || this.props;
    let renderList;
    if (cats.length > 0) {
      const arrayList =
      cats.map((cv, i) => ({
        key: cv._id || shortid.generate(),
        title: {
          content: <span color={this.state.savedID === cv._id ? 'red' : 'inherit' }>{cv.title}</span>,
        },
        content: {
          content: (
            <div className="metadata">
            <div className="meta-content">
              <List horizontal relaxed>
                <List.Item>_id: {cv._id}</List.Item>
                <List.Item>label: <Input value={cv.label} name="label" onChange={this.handleChange} /></List.Item>
                <List.Item>singLabel: <Input value={cv.singLabel} name="singLabel" onChange={this.handleChange} /></List.Item>
                <List.Item>title: <Input value={cv.title} name="title" /></List.Item>
                
              </List>
              
                <Children singLabel={cv.singLabel} children={cv.children} newChild={this.handleChildren} onChange={this.changeChildren}/> 
            </div>
            <br />
            <div className="buttons">
              <Button onClick={this.save} primary>Save</Button>
            </div>
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


export default connect(mapStateToProps, { fetchCats, saveCats })(Relationships);
