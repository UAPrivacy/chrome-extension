import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import App from './App';
import fetchData from '../api';

const Loading = () => (
  <div className="uk-flex uk-flex-center uk-flex-middle" data-uk-height-viewport>
    <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
  </div>
);

class Root extends PureComponent {
  static storeLocalStorage({ key, value }) {
    chrome.runtime.sendMessage({ store: key, value });
  }

  state = {
    terms: [],
    privacies: [],
    isLoading: true,
  };

  async componentDidMount() {
    const url = await Root.getCurrentURL();
    this.fetch(url)
      .then(({ privacies, terms }) => {
        this.setState({
          terms,
          privacies,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(`err: ${err}`);
        this.setState({
          isLoading: false,
        });
      });
  }

  static getCurrentURL() {
    return new Promise((resolve) => {
      chrome.tabs.query(
        {
          active: true,
          lastFocusedWindow: true,
        },
        (tabs) => {
          const [{ url }] = tabs;
          resolve(url);
        },
      );
    });
  }

  fetch = url => new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ load: url }, (response) => {
      if (response) {
        if (response.data) {
          const { data } = response;
          resolve(data);
        } else {
          reject(Error('Could not find data'));
        }
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
