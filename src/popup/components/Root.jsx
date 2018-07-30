import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import App from './App';
import fetchData from '../../api';
import { getCurrentURL } from '../../shared';
import Center from './Shared';

const Loading = () => (
  <Center>
    <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
  </Center>
);

const EmptyState = () => (
  <Center>
    <p>
no terms to show
    </p>
  </Center>
);

class Root extends PureComponent {
  state = {
    terms: [],
    privacies: [],
    isLoading: true,
  };

  async componentDidMount() {
    const url = await getCurrentURL();
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
            chrome.runtime.sendMessage({ store: url, value: res });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });

  render() {
    const { isLoading, privacies, terms } = this.state;
    const UI = privacies.length > 0 || terms.length > 0 ? <App privacies={privacies} terms={terms} /> : <EmptyState />;
    return isLoading ? <Loading /> : { UI };
  }
}

export default hot(module)(Root);
