import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { EmptyState } from "./Shared";

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
    const { terms, privacies, logo, termsURL, privaciesURL } = this.props;
    const isTerms = active === "terms";
    const clauses = isTerms ? terms : privacies;
    const link = isTerms ? termsURL : privaciesURL;
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
                <li className={isTerms ? "uk-active" : ""}>
                  <a
                    onClick={this.handleActiveTab("terms")}
                    uk-tooltip="title:Terms of Service; pos: left"
                    href="#terms"
                  >
                    Terms
                  </a>
                </li>
                <li className={!isTerms ? "uk-active" : ""}>
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
          {clauses.length > 0 ? (
            <ul
              className="uk-list uk-list-divider"
              uk-scrollspy="cls: uk-animation-fade; target: > li; delay: 300; repeat: true"
            >
              {clauses.map((clause, idx) => (
                <li key={idx}>{clause}</li>
              ))}
              <li>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {isTerms ? "Terms of Service" : "Privacy Policy"} page
                </a>
              </li>
            </ul>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.string).isRequired,
  privacies: PropTypes.arrayOf(PropTypes.string).isRequired,
  logo: PropTypes.string.isRequired,
  termsURL: PropTypes.string.isRequired,
  privaciesURL: PropTypes.string.isRequired
};

export default Main;
