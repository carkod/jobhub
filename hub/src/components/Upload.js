import React from "react";
import { Icon } from "semantic-ui-react";

export default function Upload(props) {
  return (
    <>
      {props.active && (
        <button
          type="button"
          className="btn btn-upload"
          name="append"
          aria-label={props.loading ? "Uploading file" : "Upload file"}
          onClick={props.handleUpload}
        >
          {props.loading ? (
            <Icon loading name="file archive outline" className="white" />
          ) : (
            <Icon name="upload" className="white" />
          )}
        </button>
      )}
      <input
        name="files"
        type="file"
        id="input"
        onChange={props.handleChange}
        ref={props.forwardedRef}
      />
    </>
  );
}
