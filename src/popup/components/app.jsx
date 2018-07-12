import React from "react";
import { hot } from "react-hot-loader";

class GreetingComponent extends React.Component {
  render() {
    return (
      <div>
        <p>Hello world</p>
      </div>
    );
  }
}

export default hot(module)(GreetingComponent);
