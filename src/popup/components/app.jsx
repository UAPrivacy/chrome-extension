import React from "react";
import { hot } from "react-hot-loader";

class GreetingComponent extends React.Component {
  render() {
    return (
      <div>
        <p>Hello, find me on src/js/popup/greeting_component.jsx</p>
      </div>
    );
  }
}

export default hot(module)(GreetingComponent);
