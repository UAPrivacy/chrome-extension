import React, { PureComponent } from 'react';
import { render } from 'react-dom';
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

export default class Popup extends PureComponent {
  static storeLocalStorage({ key, value }) {
    chrome.runtime.sendMessage({ store: key, value }, (response) => {
      console.log(response.msg);
    });
  }

  state = {
    terms: [],
    privacies: [],
    isLoading: true,
  };

  async componentDidMount() {
    // const url = await Popup.getURL();
    const url = 'facebook';
    this.fetchLocalStorage(url);
  }

  static getURL() {
    return new Promise((resolve, reject) => {
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

  fetchAPI = (url) => {
    fetchData(url)
      .then((res) => {
        const { privacies, terms } = res;
        this.setState({
          terms,
          privacies,
          isLoading: false,
        });
        Popup.storeLocalStorage({ key: url, value: { terms, privacies } });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  fetchLocalStorage = (url) => {
    chrome.runtime.sendMessage({ load: url }, (response) => {
      if (response && response.data) {
        const { data } = response;
        this.setState({
          terms: data.terms,
          privacies: data.privacies,
          isLoading: false,
        });
      } else {
        this.fetchAPI(url);
      }
    });
  };

  render() {
    const { isLoading, privacies, terms } = this.state;
    return isLoading ? <Loading /> : <App privacies={privacies} terms={terms} />;
  }
}

render(<Popup />, window.document.getElementById('app-container'));
