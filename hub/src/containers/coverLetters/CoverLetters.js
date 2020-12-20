import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Accordion, Button, Icon, Segment } from 'semantic-ui-react';
import shortid from 'shortid';
import { copyCL, deleteCL, fetchCLs, saveCL } from '../../actions/cl';
import { fetchClsApi } from "../../actions/cover-letter";
import NewCL from './NewCL';

class CoverLetters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cls: null
    };
  }

  componentDidMount = () => {
    this.props.fetchClsApi();
  }

  componentDidUpdate = (props) => {
    if (this.props.cls !== props.cls) {
      this.setState({ cls: this.props.cls })
    }
  }

  handleCopy = i => e => {
    e.preventDefault();
    const { cls } = this.state;
    let newCL = cls[i];
    delete newCL._id;
    if (cls) {
      this.props.copyCL(newCL).then(status => {
        this.props.fetchClsApi();
        //this.state.detail.messages.savedID = status.data._id;
        //this.setState({ messages })
      });
    }
  }

  handleDelete = () => {
    const getItem = this.props.cls[this.state.activeIndex],
      getID = getItem._id,
      getName = getItem.name;
    this.props.deleteCL(getID).then(cv => {
      this.setState({ openAccordion: false });
      this.props.fetchClsApi();
    })

  }


  render() {
    const { cls } = this.state;

    return (
      <div id="cls" className="">
        <h1>Section - All Cover Letters <NewCL /></h1>
        <div className="listItem">
          {this.state.cls && <Accordion onTitleClick={(e, { index }) => this.setState({ activeIndex: this.state.activeIndex === index ? -1 : index })} panels={this.state.cls.map((letter, i) => ({
            key: `panel-${letter._id}`,
            title: {
              content: <span color={this.state.savedID === letter._id ? 'red' : 'inherit'}>{letter.name}</span>,
            },
            content: {
              content: (
                <div className="metadata" >
                  <div className="meta-content">
                    <Segment.Group>
                      <Segment.Group horizontal>
                        <Segment><Icon fitted name='id card' /> {letter._id || 'N/A'}</Segment>
                        <Segment><Icon fitted name='checked calendar' /> {moment(letter.updateDate).format('Do MMMM YYYY') || 'N/A'}</Segment>
                        <Segment><Icon fitted name='clock' /> {moment(letter.createdDate).format('Do MMMM YYYY') || 'N/A'}</Segment>
                      </Segment.Group>
                      <Segment.Group horizontal>
                        <Segment><Icon fitted name='briefcase' /> {letter.cats ? letter.cats.position : 'N/A'}</Segment>
                        <Segment><Icon fitted name='talk' />{letter.cats ? letter.cats.locale : 'N/A'}</Segment>
                        <Segment><Icon fitted name='globe' />{letter.cats ? letter.cats.cvCountry : 'N/A'}</Segment>
                      </Segment.Group>
                    </Segment.Group>
                  </div>
                  <br />
                  <div className="buttons">
                    <Link className="ui primary button" to={`/coverletters/id=${letter._id}`}>Edit/View</Link>
                    <Button onClick={this.handleCopy(i)} secondary>Copy</Button>
                    <Button onClick={this.handleDelete} negative>Delete</Button>
                  </div>
                </div>
              ),
              key: shortid.generate(),
            },
          }))} styled fluid />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { clsListReducer } = state;
  return {
    cls: clsListReducer,
    cats: state.cats,
  }
}

export default connect(mapStateToProps, { saveCL, fetchClsApi, deleteCL, copyCL })(CoverLetters);




