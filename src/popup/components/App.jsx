import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import Main from "./Main";
import fetchSummaries from "../../api";
import { getCurrentURL } from "../../shared";
import { EmptyState, Loading } from "./Shared";

class App extends PureComponent {
  state = {
    terms: [],
    privacies: [],
    isLoading: true
  };

  fetchState = url =>
    new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ load: url }, response => {
        if (response && response.data) resolve(response.data);
        else
          fetchSummaries(url)
            .then(res => {
              resolve(res);
              chrome.runtime.sendMessage({ store: url, value: res });
            })
            .catch(err => reject(err));
      });
    });

  async componentDidMount() {
    const url = await getCurrentURL();
    const { privacies, terms } = await this.fetchState(url);
    this.setState({
      terms,
      privacies,
      isLoading: false
    });
  }

  render() {
    const { isLoading, privacies, terms } = this.state;
    const UI =
      privacies.length > 0 || terms.length > 0 ? (
        <Main privacies={privacies} terms={terms} />
      ) : (
        <EmptyState />
      );
    return isLoading ? <Loading /> : UI;
  }
}

export default hot(module)(App);
