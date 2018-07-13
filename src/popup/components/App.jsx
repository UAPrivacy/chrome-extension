import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import Clause from "./Clause";

class App extends PureComponent {
  state = {
    active: "terms"
  };

  handleActive = which => {
    this.setState({ active: which });
  };

  render() {
    const { active } = this.state;
    const { terms, privacies } = this.props;
    const clauses = active === "terms" ? terms : privacies;
    return (
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
            {clauses.map((clause, idx) => <Clause key={idx} text={clause} />)}
          </ul>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  terms: PropTypes.array.isRequired,
  privacies: PropTypes.array.isRequired
};

export default hot(module)(App);
