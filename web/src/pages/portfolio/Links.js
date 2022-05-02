import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCats } from "../../actions/cats";
import { fetchProjects } from "../../actions/res";

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { links } = !!Object.keys(this.state).length
      ? this.state
      : this.props;
    return (
      <div className="column">
        {links.length > 0 ? (
          <div className="links ui top left label">Links</div>
        ) : (
          ""
        )}
        <div className="ui divided selection list">
          {links.map((link, i) => (
            <div className="item" key={link.id}>
              <div className="name">
                <a href={link.url} className="url">
                  {link.title}
                  <i className="icon"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    portfolio: state.portfolio,
  };
};

export default connect(mapStateToProps, { fetchProjects, fetchCats })(Links);
