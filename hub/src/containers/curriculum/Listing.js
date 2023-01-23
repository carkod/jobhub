import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'semantic-ui-react';
import { copyCV, deleteCV, fetchCVs, saveCvApi } from '../../actions/cv';
import { formatDate } from "../../utils";
import AddNew from './AddNew';

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.fetchCVs()
  }

  componentDidUpdate = (props) => {
    if (this.props.cvs !== props.cvs) this.setState({ cvs: this.props.cvs })
  }

  handleCopy = (i) => e => {
    e.preventDefault();
    const { cvs } = this.props;
    let newCV = cvs[i];
    delete newCV._id;
    if (cvs) {
      this.props.copyCV(newCV).then(() => {
        this.props.fetchCVs();
      });
    }
  }

  handleDelete = (i) => e => {
    e.preventDefault();
    const { _id } = this.props.cvs[i];
    this.props.deleteCV(_id).then(cv => {
      this.props.fetchCVs();
    });
  }


  render() {
    return (
      <div id="list">
        <h1>Section - CV <AddNew /></h1>
        <Card.Group>
          {this.props.cvs && this.props.cvs.map((cv, i) =>
            <Card key={`panel-${cv._id}`} color={cv.cats.position === "front-end" ? "blue" : null} href={`/cv/${cv._id}`}>
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
                  <Button
                    type="button"
                    onClick={this.handleCopy(i)}
                    primary >
                      Copy
                  </Button>
                  <Button
                    type="button"
                    onClick={this.handleDelete(i)} negative>Delete</Button>
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
    cvs: state.getCvsReducer
  }
}

export default connect(mapStateToProps, { saveCvApi, fetchCVs, deleteCV, copyCV })(Listing);
