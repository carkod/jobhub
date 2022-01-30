/* eslint-disable */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, Transition } from "semantic-ui-react";

class Notification extends Component {
  constructor(p) {
    super(p);
    this._unMount = false;
    this.state = {
      message: "",
      pop: false,
      error: false,
    };
    this.removeNotification = this.removeNotification.bind(this);
  }

  componentDidUpdate(p) {
    if (this.props.snackBar !== p.snackBar) {
      if (
        Object.keys(this.props.snackBar).length !== 0 &&
        p.snackBar.message !== this.state.message
      ) {
        this.setState(
          {
            pop: true,
          },
          () => window.setTimeout(this.removeNotification, 3000)
        );
      }
    }
  }

  removeNotification() {
    if (!this._unMount) {
      this.setState({ pop: false });
    }
  }

  render() {
    const { pop } = this.state;
    let { error, message } = this.props.snackBar;
    error = error === 1 && true;
    return (
      <div id="notification">
        <Transition visible={pop} animation="scale" duration={500}>
          <Message
            color={error ? "red" : "green"}
            floating
            content={message}
          />
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = (s, p) => {
  const { snackBarReducer } = s;
  return {
    snackBar: snackBarReducer,
  };
};

export default connect(mapStateToProps)(Notification);
