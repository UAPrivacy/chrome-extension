import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { EmptyState, Clause } from "./Shared";

const getInitialActive = ({ terms, privacies }) =>
  terms.length > 0 ? "terms" : privacies.length > 0 ? "privacy" : "terms";

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: getInitialActive(props)
    };
  }

  handleActiveTab = category => () => {
    this.setState({ active: category });
  };

  render() {
    const { active } = this.state;
    const { terms, privacies, logo } = this.props;
    const clauses = active === "terms" ? terms : privacies;
    return (
      <div className="uk-section uk-section-xsmall">
        <div className="uk-container uk-container-small">
          <div
            className="uk-grid uk-child-width-1-3 uk-flex uk-flex-middle"
            uk-grid=""
          >
            <div>
              <img className="uk-visible" src={logo} alt="" />
            </div>
            <div>
              <ul className="uk-subnav uk-subnav-pill uk-flex-center uk-flex-nowrap">
                <li className={active === "terms" ? "uk-active" : ""}>
                  <a
                    onClick={this.handleActiveTab("terms")}
                    uk-tooltip="title:Terms of Service; pos: left"
                    href="#terms"
                  >
                    Terms
                  </a>
                </li>
                <li className={active === "privacy" ? "uk-active" : ""}>
                  <a
                    onClick={this.handleActiveTab("privacy")}
                    uk-tooltip="title:Privacy Policy ; pos: right"
                    href="#privacy"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <ul
            className="uk-list uk-list-divider"
            uk-scrollspy="cls: uk-animation-fade; target: > li; delay: 300; repeat: true"
          >
            {clauses.length > 0 ? (
              clauses.map((clause, idx) => <Clause key={idx} text={clause} />)
            ) : (
              <EmptyState />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.string).isRequired,
  privacies: PropTypes.arrayOf(PropTypes.string).isRequired,
  logo: PropTypes.string.isRequired
};

export default Main;
