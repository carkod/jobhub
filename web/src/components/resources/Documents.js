/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import {stateToHTML} from 'draft-js-export-html';
import { fetchProjects } from '../../actions/res';
import { fetchCats } from '../../actions/cats';
import HtmlText from './HtmlText';

class Documents extends Component {
    
    constructor(props) {
    super(props);
    const {portfolio} = this.props;
    
    this.state = {
    };
    
  }

  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (props) => {
  }
  
  render() {
    const {documents} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
        <div className="column">
          {documents.length > 0 ? <div className="files ui top right label">Files</div> : '' }
              <div className="ui divided selection list">
              {documents.map((doc, i) =>
                <div className="item" key={doc.fileId}>
                  <div className="name">
                    <a href={doc.fileURL} className="url">{doc.fileName} <i className="icon"></i></a>
                    <span className="detail">{doc.fileSize}</span>
                  </div>
                  
                </div>
              )}
            </div>
        </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    portfolio: state.portfolio  
  }
  
}


export default connect(mapStateToProps, { fetchProjects, fetchCats })(Documents);