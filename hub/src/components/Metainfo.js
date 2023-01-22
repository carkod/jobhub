import React from "react";
import { Dropdown, Header, Segment } from "semantic-ui-react";
import { checkValue, formatDate } from "../utils";

const Metainfo = ({ cv, cats, onChange }) => {
  return (
    <div id="metainfo" className="u-top-margin-title">
      <Header as="h1">
        <input
          className="u-display-block"
          type="text"
          name="name"
          value={cv.name}
          onChange={onChange}
        />
      </Header>
      <label htmlFor="navName">Navigation name:</label>
      <input
        type="text"
        name="navName"
        value={cv.navName}
        onChange={onChange}
      />
      <div className="section">
        <Header sub>META</Header>
        <Segment.Group horizontal>
          <Segment>
            <strong>Created</strong>: {formatDate(cv.createdAt)}
          </Segment>
          <Segment>
            <strong>Updated</strong>: {formatDate(cv.updatedAt)}
          </Segment>
        </Segment.Group>
        <div className="u-space-between">
          {checkValue(cats?.locales) && (
            <Dropdown
              onChange={onChange}
              name="locale"
              selection
              options={cats?.locales}
              value={cv.locale}
            />
          )}

          {checkValue(cats?.statuses) && (
            <Dropdown
              value={cv.status}
              onChange={onChange}
              name="status"
              selection
              options={cats?.statuses}
            />
          )}

          {checkValue(cats?.positions) && (
            <Dropdown
              value={cv.position}
              onChange={onChange}
              name="position"
              selection
              options={cats?.positions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Metainfo;
