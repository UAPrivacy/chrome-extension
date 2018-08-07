import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import App from './App';
// import fetchSummaries from '../../api/src/index';
import { getCurrentURL } from '../../shared';
import { Center } from './Shared';

const Loading = () => (
  <Center>
    <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
  </Center>
);

const EmptyState = () => (
  <Center>
    <p>nothing to show</p>
  </Center>
);

class Root extends PureComponent {
  state = {
    terms: [],
    privacies: [],
    isLoading: true
  };

  async componentDidMount() {
    const url = await getCurrentURL().catch(() => {
      console.error(err);
      this.setState({
        isLoading: false
      });
    });
    this.fetchState(url)
      .then(({ privacies, terms }) => {
        this.setState({
          terms,
          privacies,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(`error fetching state: ${err}`);
        this.setState({
          isLoading: false
        });
      });
  }

  fetchState = url =>
    new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ load: url }, response => {
        if (response && response.data) {
          resolve(response.data);
        } else {
          fetchSummaries(url)
            .then(res => {
              resolve(res);
              chrome.runtime.sendMessage({ store: url, value: res });
            })
            .catch(err => {
              reject(err);
            });
        }
      });
    });

  render() {
    const { isLoading, privacies, terms } = this.state;
    // verify
    const UI =
      privacies && terms && (privacies.length > 0 || terms.length > 0) ? (
        <App privacies={privacies} terms={terms} />
      ) : (
        <EmptyState />
      );
    return isLoading ? <Loading /> : UI;
  }
}

export default hot(module)(Root);
