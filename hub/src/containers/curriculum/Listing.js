import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'semantic-ui-react';
import { copyCV, deleteCV, fetchCVs, saveCV } from '../../actions/cv';
import { formatDate } from "../../utils";
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

  componentDidUpdate = (props) => {
    if (this.props.cvs !== props.cvs) this.setState({ cvs: this.props.cvs })
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

    return (
      <div id="list">
        <h1>Section - CV <AddNew /></h1>
        <Card.Group>
          {this.props.cvs.length > 0 && this.props.cvs.map((cv, i) =>
            <Card key={`panel-${cv._id}`} color={cv.cats.position === "front-end" ? "blue" : null} href={`/cv/id=${cv._id}`}>
              <Card.Content>
                <Card.Header>{cv.name}</Card.Header>
                <Card.Meta>
                  {formatDate(cv.updatedAt) || 'N/A'}{' '}
                </Card.Meta>
                <Card.Description>
                  <div className="u-space-text">
                    <Icon name='briefcase' /> {cv.cats ? cv.cats.position : 'N/A'}
                  </div>
                  <div className="u-space-text">
                    <Icon name='privacy'/>  {cv.cats? cv.cats.status : 'N/A'}
                  </div>
                  <div className="u-space-text">
                    <Icon name='clock' /> {formatDate(cv.createdAt) || 'N/A'}
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button onClick={this.handleCopy(i)} primary>Copy</Button>
                  <Button onClick={this.handleDelete} negative>Delete</Button>
                </div>
              </Card.Content>
            </Card>
          )}

        </Card.Group>
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
