import React, { Component } from 'react';

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
        <div className="uk-flex uk-flex-center uk-flex-middle" data-uk-height-viewport>
          <p>
an error has occurred
          </p>
        </div>
      );
    }
    return children;
  }
}
