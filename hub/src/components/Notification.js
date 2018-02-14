/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message, Transition } from 'semantic-ui-react';
import { fetchCVs } from '../actions/cv';
import { connect } from 'react-redux';



const message = action => {
    // console.log(action)
    switch (action) {
        case 'SET_CV':
            return 'CV fetched';
        case 'ADD_CV':
            return 'CV saved';
        case 'CV_DELETED':
            return 'CV deleted';
        case 'CV_FETCHED':
            return 'CV copied';
        case 'PDF_GENERATED':
            return 'PDFs generated';
        default:
            return false;
    }
}


class Notification extends Component {
    constructor (p) {
        super(p);
        this.state = {
            pop: false,
        }
        this.removeNotification = this.removeNotification.bind(this)
    }
    
    componentDidMount = () => {
        
    }
    
    componentWillReceiveProps (p) {
        const msg = message(p.notification.type);
        if (msg) {
            this.setState({ message: msg, pop: true }, () => window.setTimeout(this.removeNotification, 3000))    
        }
    }
    
    removeNotification () {
        this.setState({pop: false})
    } 
    
    render() {
        return (
            <div id="notification">
            <Transition visible={this.state.pop} animation='scale' duration={500}>
            <Message floating>
              <Message.Content>
                <Message.Header>{`${this.state.message}`}</Message.Header>
              </Message.Content>
            </Message>  
            </Transition>
            </div>
        )    
    }
}


const mapStateToProps = (s,p) => {
    const getState = s.notification;
    const newState = Object.assign({},p,{
        notification: getState
    });
    return newState;
}

export default connect(mapStateToProps)(Notification);