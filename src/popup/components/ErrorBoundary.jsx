import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Center } from "./Shared";

export default class ErrorBoundary extends PureComponent {
  state = {
    error: false
  };

  componentDidCatch(error, info) {
    console.error(`component error: ${error}\n${info}`);
    this.setState({ error: true });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    return error ? (
      <Center>
        <p>an error has occurred</p>
      </Center>
    ) : (
      children
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
