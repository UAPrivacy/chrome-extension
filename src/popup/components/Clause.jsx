import React from "react";
import PropTypes from "prop-types";

const Clause = ({ text }) => {
  return <p>{text}</p>;
};

Clause.propTypes = {
  text: PropTypes.string.isRequired
};

export default Clause;
