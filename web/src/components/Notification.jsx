import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Transition } from "semantic-ui-react";

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
          className={`ui message floating ${error ? "error" : "success"}`}
          style={{ backgroundColor: error ? "red" : "#1aa62a", color: "#fff" }}
        >
          <div className="content">
            <div className="header">{`${message}`}</div>
          </div>
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
