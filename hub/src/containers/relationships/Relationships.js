import produce from "immer";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Button, Input, List } from 'semantic-ui-react';
import shortid from 'shortid';
import { fetchRelationsApi, saveRelationApi } from "../../actions/relations";
import Children from './Children';


class Relationships extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      relations: [],
      activeIndex: 0
    };
  }

  
  componentDidMount = () => {
    this.props.fetchRelationsApi()
  }
  
  componentDidUpdate = (p) => {
    if (this.props.relations !== p.relations) this.setState({ relations: this.props.relations })
  }
  
  handleChange = (e) => {
    e.preventDefault();
    this.setState(produce(draft => {
      draft.relations[this.state.activeIndex][e.target.name] = e.target.value
    }))
  }
  
  save = (children) => {
    this.setState(produce(draft => {
      draft.relations[this.state.activeIndex].children = children
    }), () => this.props.saveRelationApi(this.state.relations[this.state.activeIndex]))
  }

  render() {
    let renderList;
    if (this.state.relations.length > 0) {
      const arrayList =
      this.state.relations.map((cv, i) => ({
        key: cv._id || shortid.generate(),
        title: {
          content: <span color={this.state.savedID === cv._id ? 'red' : 'inherit' }>{cv.title}</span>,
        },
        content: {
          content: (
            <div className="metadata">
            <div className="meta-content">
              <List horizontal relaxed>
                <List.Item className="u-fields-spacing">label: <Input value={cv.label} name="label" onChange={this.handleChange} /></List.Item>
                <List.Item className="u-fields-spacing">singLabel: <Input value={cv.singLabel} name="singLabel" onChange={this.handleChange} /></List.Item>
                <List.Item className="u-fields-spacing">title: <Input value={cv.title} name="title" /></List.Item>
                
              </List>
              
              <Children singLabel={cv.singLabel} children={cv.children} onSubmit={this.save}/> 
            </div>
            
          </div>
          )
        }
       
      }));
      
    renderList = <Accordion defaultActiveIndex={this.state.activeIndex} onTitleClick={(e, {index}) => this.setState({ activeIndex:this.state.activeIndex === index ? -1 : index })} panels={arrayList} styled fluid />
    
    } else {
      renderList = <p>No categories found</p>
    }
    
    return (
      <div id="list" className="">
        <h1 className="u-section-title">Section - Relationships</h1>
        {renderList}
        
      </div>
    );
  }
}

function mapStateToProps (state, props) {
  const { relationsReducer } = state;
  return {
    relations: relationsReducer
  }
}

export default connect(mapStateToProps, { fetchRelationsApi, saveRelationApi })(Relationships);
