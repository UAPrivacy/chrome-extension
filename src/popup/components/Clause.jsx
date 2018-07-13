import React from "react";
import PropTypes from "prop-types";

const Clause = ({ text }) => {
  return <li>{text}</li>;
};

Clause.propTypes = {
  text: PropTypes.string.isRequired
};

export default Clause;
