import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const buttonDefaultStyles = {
  backgroundColor: "#fff",
  border: "none",
  cursor: "pointer",
  outline: "none",
};

const AddNew = (props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/cv/new`)}
      style={buttonDefaultStyles}
    >
      <Icon name="plus square" color="green" />
    </button>
  );
};

export default AddNew;