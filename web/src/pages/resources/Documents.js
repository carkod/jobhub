import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCats } from "../../actions/cats";
import { fetchProjects } from "../../actions/res";

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { documents } = !!Object.keys(this.state).length
      ? this.state
      : this.props;
    return (
      <>
        <Helmet>
          <title>{`Carlos Wu - ${title} | Portfolio`}</title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={title}
          />
        </Helmet>

        <div className="column">
          {documents.length > 0 ? (
            <div className="files ui top right label">Files</div>
          ) : (
            ""
          )}
          <div className="ui divided selection list">
            {documents.map((doc, i) => (
              <div className="item" key={doc.fileId}>
                <div className="name">
                  <a href={doc.fileURL} className="url">
                    {doc.fileName} <i className="icon"></i>
                  </a>
                  <span className="detail">{doc.fileSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    portfolio: state.portfolio,
  };
};

export default connect(mapStateToProps, { fetchProjects, fetchCats })(
  Documents
);
