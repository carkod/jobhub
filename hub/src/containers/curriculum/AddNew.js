import React, { Component } from 'react';
import { Modal, Header, Button, Icon, Transition, Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveCvApi } from '../../actions/cv';

const buttonDefaultStyles = {
  backgroundColor: '#fff',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}

class AddNew extends Component {

  state = {
    savedID: null,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    this.props.saveCvApi({ _id: '', name: this.state.name })
      .then(cv => {
        this.setState({ savedID: cv.data._id, modalOpen: false });

      })

  }

  render() {

    const addNewButton =
      <button onClick={() => this.setState({ modalOpen: true })} style={buttonDefaultStyles} >
        <Icon name="plus square" color="green" />
      </button>;

    return (
      <Transition duration={500}>
        <Modal trigger={addNewButton} size={'tiny'} open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })} closeIcon basic>
          <Header icon='file text outline' content='New CV' />
          <Modal.Content>
            <Form id="newcv" onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input autoFocus type="text" name="name" placeholder="Name or title of the new CV" onChange={this.handleChange} />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button form="newcv" type="submit" color='green'>
              <Icon name='save' /> Save
              </Button>
          </Modal.Actions>
        </Modal>
      </Transition>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    cvs: state.cvs
  }
}

export default connect(mapStateToProps, { saveCvApi })(AddNew);