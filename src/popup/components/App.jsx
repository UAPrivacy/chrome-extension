import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clause from './Clause';
import { EmptyState } from './Shared';

class App extends PureComponent {
  constructor(props) {
    super(props);
    const { terms } = this.props;
    this.state = {
      active: terms.length > 0 ? 'terms' : 'privacy'
    };
  }

  handleActiveTab = which => () => {
    this.setState({ active: which });
  };

  render() {
    const { active } = this.state;
    const { terms, privacies } = this.props;
    const clauses = active === 'terms' ? terms : privacies;
    return (
      <div className="uk-section uk-section-xsmall">
        <div className="uk-container uk-container-small">
          <ul className="uk-subnav uk-subnav-pill uk-flex-center">
            <li className={active === 'terms' ? 'uk-active' : ''}>
              <a
                onClick={this.handleActiveTab('terms')}
                uk-tooltip="title:User Agreements; pos: left"
              >
                Terms
              </a>
            </li>
            <li className={active === 'privacy' ? 'uk-active' : ''}>
              <a
                onClick={this.handleActiveTab('privacy')}
                uk-tooltip="title:Privacy Policies ; pos: right"
              >
                Privacy
              </a>
            </li>
          </ul>
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

App.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.string).isRequired,
  privacies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
