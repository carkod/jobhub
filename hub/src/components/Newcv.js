/* eslint-disable */

import React, { Component } from 'react';
import { Modal, Header, Button, Icon, Transition, Form } from 'semantic-ui-react';

const buttonDefaultStyles = {
        backgroundColor: '#fff',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
      }




const Newcv = (props) => {
  
    const addNewButton = 
      <button style={buttonDefaultStyles} >
        <Icon name="plus square" color="green" />
      </button>;
   
    return (
      <Transition duration={500}>
        <Modal trigger={addNewButton} size={'tiny'} closeIcon basic>
            <Header icon='file text outline' content='New CV' />
            <Modal.Content>
            <Form>
              <Form.Field>
                <input name="name" placeholder="Name or title of the new CV" onChange={props.change}/>
              </Form.Field>
            </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={props.save} type="submit" color='green'>
                <Icon name='checkmark' /> Save
              </Button>
            </Modal.Actions>
        </Modal>
      </Transition>
  )
}

export default Newcv;