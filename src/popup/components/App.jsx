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
    setTimeout(() => {
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
    }, 1000);
  }

  render() {
    const { clauses, isLoading } = this.state;
    const renderResult = isLoading ? (
      <div
        class="uk-flex uk-flex-center uk-flex-middle"
        data-uk-height-viewport
      >
        <span uk-spinner="ratio: 4.5" class="uk-margin-auto-vertical" />
      </div>
    ) : (
      <ul class="uk-list uk-list-divider">
        {clauses.map(clause => <Clause text={clause} />)}
      </ul>
    );
    return renderResult;
  }
}

export default hot(module)(App);
