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
    const { documents } = this.props;
    if (!documents) return null;
    return (
      <>
        <div className="column">
          {documents.length > 0 && <div className="files ui top right label">Files</div>}
          <div className="ui divided selection list">
            {documents.map((doc, i) => (
              <div className="item" key={doc.fileId || i}>
                <div className="name">
                  <a href={doc.fileURL} className="url">{doc.fileName} <i className="icon"></i></a>
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

const mapStateToProps = (state) => ({ portfolio: state.portfolio });
export default connect(mapStateToProps, { fetchProjects, fetchCats })(Documents);
