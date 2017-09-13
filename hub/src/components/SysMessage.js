/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message } from 'semantic-ui-react';

const SysMessage = props => {
    const message = props.messages
    let status;
    
    switch (true) {
      case !!message.deletedID:
        status = 'deleted'
        break;
      case !!message.savedID:
        status = 'added'
        break;
      case !!message.copiedID:
        status = 'copied'
        break;
      
      default:
        status = null
    }
    
    return (
    <Message info hidden={status ? false : true}>
      {/*console.log(message)*/}
      <Message.Header>Item has been {status}</Message.Header>
      <p><strong>Name:</strong> {message.deletedName || message.savedName || message.copiedName }</p>
      <p><strong>ID:</strong> {message.deletedID || message.savedID || message.copiedID }</p>
    </Message>    
    )
}

export default SysMessage;