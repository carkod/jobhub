import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const AddNew = (props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/cv/new`)}
      className="btn__add-new"
      aria-label="Add CV"
    >
      <Icon name="plus" />
    </button>
  );
};

export default AddNew;
