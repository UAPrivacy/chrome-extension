import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    console.error(error, info);
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <div>
          <p>
error
          </p>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.func.isRequired,
};
