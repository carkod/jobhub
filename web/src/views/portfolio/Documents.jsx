import React, { Component } from "react";

export default class Documents extends Component {
  render() {
    const { documents } = this.props;
    if (!documents || documents.length === 0) return null;
    return (
      <div className="ed-project__docs">
        <h4 className="ed-project__aside-title">Files</h4>
        <ul className="ed-project__link-list">
          {documents.map((doc, i) => (
            <li key={doc.fileId || i}>
              <a href={doc.fileURL} target="_blank" rel="noopener noreferrer" className="ed-project__link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {doc.fileName}
                {doc.fileSize && <span className="ed-project__doc-size">{doc.fileSize}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
