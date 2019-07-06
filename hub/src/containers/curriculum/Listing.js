import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Accordion, Button, Icon, Segment } from 'semantic-ui-react';
import { copyCV, deleteCV, fetchCVs, saveCV } from '../../actions/cv';
import AddNew from './AddNew';

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleCopy = this.handleCopy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchCVs()
  }

  componentWillReceiveProps = (props) => {
    this.setState({ cvs: props.cvs })
  }

  handleCopy = i => e => {
    e.preventDefault();
    const { cvs } = this.state;
    let newCV = cvs[i];
    delete newCV._id;
    if (cvs) {
      this.props.copyCV(newCV).then((status) => {
        this.props.fetchCVs();
        //this.state.detail.messages.savedID = status.data._id;
        //this.setState({ messages })
      });
    }
  }

  handleDelete = () => {
    const getItem = this.props.cvs[this.state.activeIndex], getID = getItem._id;
    this.props.deleteCV(getID).then(cv => {
      this.setState({ openAccordion: false });
      this.props.fetchCVs();
    })

  }


  render() {
    let renderList;
    if (this.props.cvs.length > 0) {
      const arrayList =
        this.props.cvs.map((cv, i) => ({
          key: `panel-${cv._id}`,
          title: {
            content: <span>{cv.name !== undefined ? cv.name : 'Enter name'}</span>,
          },
          content: {
            content: (
              <div className="metadata">
                <div className="meta-content">
                  <Segment.Group>
                    <Segment.Group horizontal>
                      <Segment>
                        <Icon fitted name='id card' />{cv._id || 'N/A'}
                      </Segment>

                      <Segment>
                        <Icon fitted name='checked calendar' /> {moment(cv.updateDate).format('Do MMMM YYYY') || 'N/A'}
                      </Segment>

                      <Segment>
                        <Icon fitted name='clock' /> {moment(cv.createdDate).format('Do MMMM YYYY') || 'N/A'}
                      </Segment>

                      <Segment>
                        <Icon fitted name='briefcase' /> {cv.cats ? cv.cats.position : 'N/A'}
                      </Segment>

                      <Segment><Icon fitted name='talk' /> {cv.cats ? cv.cats.cvLang : 'N/A'}</Segment>



                    </Segment.Group>

                    <Segment.Group horizontal>

                      <Segment>
                        <Icon fitted name='globe' /> {cv.cats ? cv.cats.cvCountry : 'N/A'}
                      </Segment>

                      <Segment>
                        <Icon fitted name='linkify' /> {cv.slug || ''}
                      </Segment>

                      <Segment>
                        Status: {cv.cats.status}
                      </Segment>

                    </Segment.Group>
                  </Segment.Group>
                </div>

                <br />

                <div className="buttons">
                  <Link className="ui primary button" to={`/cv/id=${cv._id}`}>Edit/View</Link>
                  <Button onClick={this.handleCopy(i)} secondary>Copy</Button>
                  <Button onClick={this.handleDelete} negative>Delete</Button>
                </div>
              </div>
            )
          }

        }));

      renderList = <Accordion onTitleClick={(e, { index }) => this.setState({ activeIndex: this.state.activeIndex === index ? -1 : index })} panels={arrayList} styled fluid />

    } else {
      renderList = <p>No CVs found</p>
    }


    return (
      <div id="list">
        <h1>Section - CV <AddNew /></h1>
        <div className="listItem">
          {renderList}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    cvs: state.cvs
  }
}

export default connect(mapStateToProps, { saveCV, fetchCVs, deleteCV, copyCV })(Listing);
