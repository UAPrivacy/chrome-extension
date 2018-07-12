import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";

class App extends PureComponent {
  render() {
    return (
      <div>
        <p>Hello world</p>
      </div>
    );
  }
}

export default hot(module)(App);
