/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import moment from 'moment';
import { Icon, Button, Header, Input } from 'semantic-ui-react';
import RichTextEditor from 'react-rte';

import { saveCL, fetchCLs } from '../../actions/cl';

import Metainfo from './Metainfo'; 
import Editor from './Editor'; 
import SysMessage from './SysMessage';

class Letter extends Component {

  constructor(props) {
    super(props);
    let {cl, detail} = this.props;
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
    document.addEventListener('keydown', this.keySave, false);
  }
  
  componentWillReceiveProps = (props) => {
    const {cl} = props;
    this.setState({ cl })
  }
  
  metaChange = (e, value) => {
    const {cl} = this.state;
    if (e.target.name) {
      cl[e.target.name] = e.target.value;
    } else {
      cl.cats[value.name] = value.value;
    }
    this.setState({ cl })
  }
  
  descChange = (v) => {
    const {desc} = this.state.cl;
    this.state.cl.desc = v;
    this.setState({ desc })
  }
  
  handleChange = ({links}) => {
    this.setState({links: links})
  }
 
  handleFiles = (docs) => {
    const {cl} = this.state;
    this.state.cl.documents = docs.documents;
    this.setState({ cl })
  }
  
  keySave = e => {
    const {cl} = this.state;
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        this.props.savecl(cl).then(status => {
          //this.state.detail.messages.savedID = status.data._id;
          //this.setState({ messages })
        });
      }
    }
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const {cl} = this.state;
    //const {messages} = this.state.projUI;
    
    this.props.saveCL(cl).then(status => {
      //this.state.detail.messages.savedID = status.data._id;
      //this.setState({ messages })
    });
    
  }
  
  render() {
    const {cl} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div id="cl">
      <form onSubmit={this.onSubmit} name="cl" >
        <Metainfo meta={cl} onChange={this.metaChange} />
        <div className="container">
          <Editor value={cl.desc} onChange={v => this.descChange(v)} />
          {/*<SysMessage messages={this.state.projUI.messages} />*/}
          
          <Button type="submit" value="Save">
            <Icon name="save" />Save
          </Button>
          
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  
  if (state.coverLetters[0]._id) {
    const cl = state.coverLetters.find(item => item._id === props.match.params.id);
    return {
      cl: cl,
    }
  } else {
    return { 
      cl: state.coverLetters[0],
    }    
  }
  
}


export default connect(mapStateToProps, { saveCL, fetchCLs })(Letter);

