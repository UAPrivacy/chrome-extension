import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import App from './App';
import fetchData from '../api';

const Loading = () => (
  <div className="uk-flex uk-flex-center uk-flex-middle" data-uk-height-viewport>
    <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
  </div>
);

// const Error = () => 'error fetching summaries';

class Root extends PureComponent {
  static storeLocalStorage({ key, value }) {
    chrome.runtime.sendMessage({ store: key, value });
  }

  state = {
    terms: [],
    privacies: [],
    isLoading: true,
  };

  componentDidMount() {
    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        const [{ url }] = tabs;
        this.fetch(url)
          .then(({ privacies, terms }) => {
            this.setState({
              terms,
              privacies,
              isLoading: false,
            });
          })
          .catch((e) => {
            this.setState({
              isLoading: false,
            });
          });
      },
    );
  }

  fetch = url => new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ load: url }, (response) => {
      if (response && response.data) {
        const { data } = response;
        resolve(data);
      } else {
        fetchData(url)
          .then((res) => {
            resolve(res);
            Root.storeLocalStorage({ key: url, value: res });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });

  render() {
    const { isLoading, privacies, terms } = this.state;
    return isLoading ? <Loading /> : <App privacies={privacies} terms={terms} />;
  }
}

export default hot(module)(Root);
