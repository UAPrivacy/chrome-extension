import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import Main from "./Main";
import fetchSummaries from "../../api";
import { getCurrentURL } from "../../shared";
import { EmptyState, Loading } from "./Shared";

function getLength(summaries) {
  let length = 0;
  if (summaries) {
    if (summaries.terms) length += summaries.terms.length;
    if (summaries.privacies) length += summaries.privacies.length;
  }
  return length;
}

class App extends PureComponent {
  state = {
    terms: [],
    privacies: [],
    isLoading: true,
    logo: ""
  };

  fetchState = url =>
    new Promise(resolve => {
      fetchSummaries(url).then(summaries => {
        chrome.runtime.sendMessage({ badge: getLength(summaries) });
        return resolve(summaries);
      });
    });

  async componentDidMount() {
    const url = await getCurrentURL();
    const { privacies, terms } = await this.fetchState(url);
    this.setState({
      terms,
      privacies,
      isLoading: false,
      logo: `https://logo.clearbit.com/${url}?size=36`
    });
  }

  render() {
    const { isLoading, privacies, terms, logo } = this.state;
    const UI =
      privacies.length > 0 || terms.length > 0 ? (
        <Main privacies={privacies} terms={terms} logo={logo} />
      ) : (
        <EmptyState />
      );
    return isLoading ? <Loading /> : UI;
  }
}

export default hot(module)(App);
