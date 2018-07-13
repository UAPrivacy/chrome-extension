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

  fetchLocalStorage() {
    chrome.runtime.sendMessage("load", function(response) {
      if (response.data) {
        console.log("fetching from storage");
        this.setState({
          terms: data.terms,
          privacies: data.privacies,
          isLoading: false
        });
      } else {
        fetchAPI();
      }
    });
  }

  storeLocalStorage(value) {
    chrome.runtime.sendMessage({ key: "store", value }, function(response) {
      console.log(response);
    });
  }

  fetchAPI() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(results => {
        const data = results.data.map(post => post.body).slice(0, 15);
        const { privacies, terms } = data;
        this.setState(
          {
            terms: data,
            privacies: data.slice().reverse(),
            isLoading: false
          },
          () => this.storeLocalStorage({ terms, privacies })
        );
      })
      .catch(() => {
        console.error("error fetching clauses");
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.fetchLocalStorage();
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
