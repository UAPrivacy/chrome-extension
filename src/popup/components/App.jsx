import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import Clause from "./Clause";
import axios from "axios";

const Loading = () => (
  <div
    className="uk-flex uk-flex-center uk-flex-middle"
    data-uk-height-viewport
  >
    <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
  </div>
);

class App extends PureComponent {
  state = {
    clauses: [],
    isLoading: true,
    active: "terms"
  };

  componentDidMount() {
    // TODO remove timeout
    setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(results => {
          this.setState({
            clauses: results.data.map(post => post.body).slice(0, 5),
            isLoading: false
          });
        })
        .catch(() => {
          console.error("error fetching clauses");
          this.setState({
            isLoading: false
          });
        });
    }, 500);
  }

  handleActive = which => {
    this.setState({ active: which });
  };

  render() {
    const { clauses, isLoading, active } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <div className="uk-section uk-section-xsmall">
        <div className="uk-container uk-container-small">
          <ul className="uk-subnav uk-subnav-pill uk-flex-center">
            <li className={active === "terms" ? "uk-active" : ""}>
              <a onClick={() => this.handleActive("terms")}>Terms</a>
            </li>
            <li className={active === "privacy" ? "uk-active" : ""}>
              <a onClick={() => this.handleActive("privacy")}>Privacy</a>
            </li>
          </ul>

          <ul
            className="uk-list uk-list-divider"
            uk-scrollspy="cls: uk-animation-fade; target: > li; delay: 300; repeat: true"
          >
            {clauses.map(clause => <Clause text={clause} />)}
          </ul>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
