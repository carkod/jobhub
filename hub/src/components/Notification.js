/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Transition } from 'semantic-ui-react';

class Notification extends Component {
    constructor(p) {
        super(p);
        this.state = {
            pop: false,
            error: false,
        }
        this.removeNotification = this.removeNotification.bind(this);
        this.message = this.message.bind(this);
    }

    componentDidMount = () => {

    }

    componentWillReceiveProps(p) {
        const msg = this.message(p.notification.type);
        if (msg) {
            this.setState({ message: msg, pop: true }, () => window.setTimeout(this.removeNotification, 3000))
        }
        if (Object.keys(p.snackBar).length !== 0) {
            this.setState({
                message: p.snackBar.message,
                error: true,
                pop: true
            }, () => window.setTimeout(this.removeNotification, 3000))
        }
    }

    removeNotification() {
        this.setState({ pop: false })
    }

    message = action => {
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
            case 'SET_APPLICATIONS':
                return 'Applications loaded';
            case 'ADD_APPLICATION':
                return 'Application added';
            case 'APPLICATION_FETCHED' || 'RETRIEVED_APPLICATION':
                return 'Application fetched';
            case 'APPLICATION_DELETED':
                return 'Application deleted';
            case 'APPLICATION_UPDATED':
                return 'Application updated';
            case 'IS_AUTH':
                return 'Login successful!';
            case 'NO_MORE_STAGES':
                return 'No more stages to move forward';
            case 'APPLICATION_MOVED_STAGE':
                return 'Application stage moved forward';

            case 'NOT_AUTH':
                this.setState({ error: true });
                return 'Login error';
            default:
                return false;
        }
    }

    render() {
        const { pop, error, message } = this.state;
        return (
            <div id="notification">
                <Transition visible={pop} animation='scale' duration={500}>
                    <Message error={error} floating>
                        <Message.Content>
                            <Message.Header>{`${message}`}</Message.Header>
                        </Message.Content>
                    </Message>
                </Transition>
            </div>
        )
    }
}


const mapStateToProps = (s, p) => {
    return {
        notification: s.notification,
        snackBar: s.snackBar
    }
}

export default connect(mapStateToProps)(Notification);