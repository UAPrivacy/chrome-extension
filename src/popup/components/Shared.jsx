import React from 'react';
import PropTypes from 'prop-types';

const Center = ({ children }) => (
  <div
    className="uk-flex uk-flex-center uk-flex-middle"
    data-uk-height-viewport
  >
    {children}
  </div>
);

const EmptyDiv = () => <div />;

Center.propTypes = {
  children: PropTypes.node.isRequired
};

export { Center, EmptyDiv };
