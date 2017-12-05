/* eslint-disable */

import React, { Component } from 'react';
import { Modal, Header, Button, Icon, Transition, Form, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveProject, fetchPortfolio } from '../../actions/project';

const buttonDefaultStyles = {
        backgroundColor: '#fff',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
      }

class NewProject extends Component {
  
  state = {
    savedID: null,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  handleSubmit = () => {
    //console.log(this.state)
    this.props.saveProject({ _id:'', name: this.state.name })
    .then(project => { 
      this.setState({ savedID: project.data._id, modalOpen: false });
      this.props.sysmessage({ savedID: project.data._id, savedName: this.state.name })
    })
    
  }
  
  render() {
  
    const addNewButton = 
      <button onClick={ () => this.setState({ modalOpen: true }) } style={buttonDefaultStyles} >
        <Icon name="plus square" color="green" />
      </button>;
    
    return (
      <Transition duration={500}>
        <Modal trigger={addNewButton} size={'tiny'} open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })} closeIcon basic>
            <Header icon='file text outline' content='New Project' />
            <Modal.Content>
            <Form id="newproject" onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input autoFocus type="text" name="name" placeholder="Name or title of the new Project" onChange={this.handleChange} />
              </Form.Field>
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button form="newproject" type="submit" color='green'>
                <Icon name='save' /> Save
              </Button>
            </Modal.Actions>
        </Modal>
      </Transition>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    portfolio: state.portfolio
  }
}

export default connect(mapStateToProps, { saveProject, fetchPortfolio })(NewProject);