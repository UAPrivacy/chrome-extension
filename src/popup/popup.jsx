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

export default class Popup extends PureComponent {
  state = {
    terms: [],
    privacies: []
  };

  componentDidMount() {
    // TODO remove timeout
    setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(results => {
          const data = results.data.map(post => post.body).slice(0, 15);
          this.setState({
            terms: data,
            privacies: data.slice().reverse(),
            isLoading: false
          });
        })
        .catch(() => {
          console.error("error fetching clauses");
          this.setState({
            isLoading: false
          });
        });
    }, 500);
  }
  render() {
    return <App clauses={clauses} terms={terms} />;
  }
}

render(<Popup />, window.document.getElementById("app-container"));
