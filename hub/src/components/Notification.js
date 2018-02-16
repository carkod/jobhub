/* eslint-disable */

import React, { Component } from 'react';
import { Item, Header, Accordion, Button, Icon, List, Label, Message, Transition } from 'semantic-ui-react';
import { fetchCVs } from '../actions/cv';
import { connect } from 'react-redux';

<<<<<<< HEAD


const message = action => {
    console.log(action)
=======
const message = action => {
    // console.log(action)
>>>>>>> new history fix corrupted git
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
        case 'SET_CLS':
            return 'Cover Letter fetched';
        case 'ADD_CL':
            return 'Cover Letter saved';
        case 'CL_DELETED':
            return 'Cover Letter deleted';
        case 'CL_FETCHED':
            return 'Cover Letter copied';
<<<<<<< HEAD
=======
        case 'FILE_REMOVED':
            return 'File has been removed';
        case 'SET_PROJECTS':
            return 'Projects have been loaded';
        case 'PROJECT_DELETED':
            return 'Project deleted';
        case 'ADD_PROJECT':
            return 'Project saved';
        case 'SAVED_CATS':
            return 'Categories saved';
        case 'NO_FILE':
            return 'File not found';
        case 'UPLODED_FILE':
            return 'File was uploaded';
        
>>>>>>> new history fix corrupted git
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