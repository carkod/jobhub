import React, { Component } from "react";
import { connect } from "react-redux";

class Notification extends Component {
  constructor(p) {
    super(p);
    this._unMount = false;
    this.state = { message: "", pop: false, error: false };
    this.removeNotification = this.removeNotification.bind(this);
  }

  componentDidUpdate(p) {
    if (this.props.snackBar !== p.snackBar) {
      if (
        Object.keys(this.props.snackBar).length !== 0 &&
        p.snackBar.message !== this.state.message
      ) {
        this.setState({ pop: true }, () =>
          window.setTimeout(this.removeNotification, 3000),
        );
      }
    }
  }

  componentWillUnmount() {
    this._unMount = true;
  }

  removeNotification() {
    if (!this._unMount) {
      this.setState({ pop: false });
    }
  }

  render() {
    const { pop } = this.state;
    const { error, message } = this.props.snackBar;
    if (!pop || !message) return null;
    return (
      <div id="notification">
        <div
          className={`ed-notification ed-notification--${
            error ? "error" : "success"
          }`}
          role="status"
        >
          {`${message}`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (s) => {
  const { snackBarReducer } = s;
  return { snackBar: snackBarReducer };
};

export default connect(mapStateToProps)(Notification);
