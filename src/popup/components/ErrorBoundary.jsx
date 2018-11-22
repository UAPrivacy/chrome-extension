import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Center } from "./Shared";

export default class ErrorBoundary extends PureComponent {
  state = {
    error: false
  };

  componentDidCatch(error, info) {
    console.error(`component caught error: ${error}\n${info}`);
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <Center>
          <p>an error has occurred</p>
        </Center>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
