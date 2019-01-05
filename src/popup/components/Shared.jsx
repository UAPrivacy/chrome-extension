import React from "react";
import PropTypes from "prop-types";

const Center = ({ children }) => (
  <div className="uk-flex uk-flex-center uk-flex-middle" uk-height-viewport="">
    {children}
  </div>
);

Center.propTypes = {
  children: PropTypes.node.isRequired
};

const Clause = ({ text }) => <li>{text}</li>;

Clause.propTypes = {
  text: PropTypes.string.isRequired
};

const Loading = () => (
  <Center>
    <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
  </Center>
);

const EmptyState = () => (
  <Center>
    <p>nothing to show</p>
  </Center>
);

export { Center, EmptyState, Loading, Clause };
