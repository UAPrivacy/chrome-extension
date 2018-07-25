import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
// assets
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import App from './components/App';
import fetchData from './api';

import './popup.css';

UIkit.use(Icons);
window.UIkit = UIkit;

const Loading = () => (
  <div className="uk-flex uk-flex-center uk-flex-middle" data-uk-height-viewport>
    <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
  </div>
);

class Popup extends PureComponent {
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
            console.log(url);
            this.setState({
              terms,
              privacies,
              isLoading: false,
            });
          })
          .catch((e) => {
            console.log('i get here');
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
            Popup.storeLocalStorage({ key: url, value: res });
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

const PopupHot = hot(module)(Popup);

render(<PopupHot />, window.document.getElementById('app-container'));
