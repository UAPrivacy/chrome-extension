import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import Clause from "./Clause";
import axios from "axios";

class App extends PureComponent {
  state = {
    clauses: [],
    isLoading: true
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(results => {
        this.setState({
          clauses: results.data.map(post => post.body),
          isLoading: false
        });
      })
      .catch(() => {
        console.error("error fetching clauses");
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    const { clauses, isLoading } = this.state;
    const renderResult = isLoading ? (
      <div className="uk-flex uk-flex-center">loading...</div>
    ) : (
      <div>{clauses.map(clause => <Clause text={clause} />)}</div>
    );

    return renderResult;
  }
}

export default hot(module)(App);
