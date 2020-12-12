/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { fetchCats } from '../../actions/cats';
import { fetchCLs, generatePDF, editCL } from '../../actions/cl';
import Metainfo from '../Metainfo';
import Editor from '../../components/Editor';
import update from 'react-addons-update';

class Letter extends Component {

  constructor(props) {
    super(props);
    let { cl, detail } = this.props;
    this.state = {
      cl: props.cl,
    };
    this.metaChange = this.metaChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchCLs();
    this.props.fetchCats();
    document.addEventListener('keydown', this.keySave, false);
  }

  componentDidUpdate = (props) => {
    if (this.props.cl !== props.cl || this.props.cats !== props.cats) {
      const { cl, cats } = this.props;
      this.setState({ cl, cats })
    }
    
  }

  metaChange = (e, value) => {
    const { cl } = this.state;
    if (e.target.name) {
      cl[e.target.name] = e.target.value;
    } else {
      cl.cats[value.name] = value.value;
    }
    this.setState({ cl })
  }

  descChange = (v) => {
    const updatedDesc = update(this.state.cl,
      {
        desc: { $set: v.toString('html') }
      }
    )
    this.setState({ cl: updatedDesc })
  }

  handleName = e => {
    const { cl } = this.state;
    cl[e.target.name] = e.target.value
    this.setState({ cl })
  }

  handleChange = ({ links }) => {
    this.setState({ links: links })
  }

  handleFiles = (docs) => {
    const { cl } = this.state;
    this.state.cl.documents = docs.documents;
    this.setState({ cl })
  }

  keySave = e => {
    const { cl } = this.state;
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        this.onSubmit(e);
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    clearTimeout();
    const { cl } = this.state;
    this.props.editCL(cl).then(res => {
      this.props.generatePDF(cl._id).then(url => {
        this.props.editCL(cl).then(res => console.log('second save'));
      })
    })
    
  }


  render() {
    const { cl } = !!Object.keys(this.state).length ? this.state : this.props;
    const { cats } = this.props;
    return (
      <div id="cl">
        <form onSubmit={this.onSubmit} name="cl" >
          <Metainfo meta={cl} onChange={this.metaChange} categories={cats} name={this.handleName} />
          <div className="container">
            <Editor value={cl.desc} onChange={this.descChange} />

            <Button type="submit" color='green'>
              <Icon name="save" />Save
          </Button>

          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {

  if (state.coverLetters[0]._id && state.cats[0]._id) {
    const cl = state.coverLetters.find(item => item._id === props.match.params.id);
    return {
      cl: cl,
      cats: state.cats,
    }
  } else {
    return {
      cl: state.coverLetters[0],
      cats: state.cats
    }
  }

}


export default connect(mapStateToProps, { editCL, fetchCLs, fetchCats, generatePDF })(Letter);

