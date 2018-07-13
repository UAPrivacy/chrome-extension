import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import Clause from "./Clause";
import axios from "axios";

class App extends PureComponent {
  state = {
    clauses: []
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(results => {
      this.setState({ clause: results.data.map(post => post.body) });
    });
  }

  render() {
    const { clauses } = this.state;
    return (
      <div>
        {clauses.map(clause => <Clause text={clause} />)}
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          totam nam sed illum architecto libero amet a inventore similique est
          repudiandae, sit, repellendus possimus asperiores, cum assumenda non.
          Vero, asperiores.
        </p>
      </div>
    );
  }
}

export default hot(module)(App);
