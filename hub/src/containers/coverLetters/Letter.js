import Metainfo from '../Metainfo';
import Editor from '../../components/Editor';
import update from 'react-addons-update';
import produce from "immer";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { fetchCats } from '../../actions/cats';
import { fetchClApi } from '../../actions/cover-letter';

class Letter extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.props.fetchClApi(this.props.match.params.id);
    // this.props.fetchCats();
  }

  componentDidUpdate = (props) => {
    if (this.props.name !== props.name) {
      this.setState(produce(draft => {
        draft = this.props
      }))
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
    // const { cats } = this.props;
    return (
      <div id="cl">
        { this.state.name && <form onSubmit={this.onSubmit} name="cl" >
          <Metainfo name={this.state.name} meta={this.state.cats} onChange={this.metaChange} />
          <div className="container">
            <Editor value={this.state.desc} onChange={this.descChange} />

            <Button type="submit" color='green'>
              <Icon name="save" />Save
            </Button>

          </div>
        </form>
        }
      </div> 
    );
  }
}

const mapStateToProps = (state, props) => {
  const { clReducer } = state;
  return {
    ...state,
    clReducer
  }
}


export default connect(mapStateToProps, { fetchClApi, fetchCats })(Letter);

