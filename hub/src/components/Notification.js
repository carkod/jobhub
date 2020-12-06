/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Transition } from 'semantic-ui-react';

class Notification extends Component {

    constructor(p) {
        super(p);
        this._unMount = false
        this.state = {
            message: '',
            pop: false,
            error: false,
        }
        this.removeNotification = this.removeNotification.bind(this);
    }

    componentDidUpdate(p) {
        if (Object.keys(p.snackBar).length !== 0 && (p.snackBar.message !== this.state.message)) {
            this.setState({
                pop: true
            }, () => window.setTimeout(this.removeNotification, 3000))
        }
    }

    componentDidMount = () => {
        this._unMount = false
    }

    componentWillUnmount = () => {
        this._unMount = true
    }

    removeNotification() {
        if (!this._unMount) {
            this.setState({ pop: false })
        }
    }

    render() {
        const { pop } = this.state;
        const { error, message } = this.props.snackBar;
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