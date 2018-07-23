import App from "./components/App";
import React, { PureComponent } from "react";
import { render } from "react-dom";
import axios from "axios";
// assets
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);
window.UIkit = UIkit;

import "./popup.css";
// TODO find better way of loading static images into /build
import logo from "../assets/logo.png";
import favicon from "../assets/favicon.png";

const Loading = () => (
  <div
    className="uk-flex uk-flex-center uk-flex-middle"
    data-uk-height-viewport
  >
    <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
  </div>
);

export default class Popup extends PureComponent {
  state = {
    terms: [],
    privacies: [],
    isLoading: true
  };

  fetchLocalStorage = () => {
    chrome.runtime.sendMessage({ load: true }, response => {
      if (response && response.data) {
        const data = response.data;
        this.setState({
          terms: data.terms,
          privacies: data.privacies,
          isLoading: false
        });
      } else {
        this.fetchAPI();
      }
    });
  };

  storeLocalStorage(data) {
    chrome.runtime.sendMessage({ store: true, data }, function(response) {
      console.log(response.msg);
    });
  }

  fetchAPI = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(results => {
        results = results.data.map(post => post.body).slice(0, 15);

        const data = {
          terms: results,
          privacies: results.slice().reverse()
        };

        const { privacies, terms } = data;
        this.setState({
          terms: data.terms,
          privacies: data.privacies,
          isLoading: false
        });
        this.storeLocalStorage({ terms, privacies });
      })
      .catch(() => {
        console.error("error fetching clauses");
        this.setState({
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.getURL();
    this.fetchLocalStorage();
  }

  getURL() {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true
      },
      function(tabs) {
        const url = tabs[0].url;
        console.log(url);
      }
    );
  }

  render() {
    const { isLoading, privacies, terms } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <App privacies={privacies} terms={terms} />
    );
  }
}

render(<Popup />, window.document.getElementById("app-container"));
