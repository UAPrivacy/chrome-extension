import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import Clause from './Clause'

class App extends PureComponent {
  state = {
    clauses = []
  }

  componentDidMount() {

  }

  render() {
    const {clauses} = this.state;
    return (
      <div>
{clauses}
      </div>
    );
  }
}

export default hot(module)(App);
