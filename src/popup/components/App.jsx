import React, { PureComponent } from "react";
import { hot } from "react-hot-loader";
import Main from "./Main";
import fetchSummaries from "../../api";
import { getCurrentURL } from "../../shared";
import { EmptyState, Loading } from "./Shared";

function getLengthSafe(summaries) {
  let length = 0;
  if (summaries) {
    if (summaries[0]) length += summaries[0].length;
    if (summaries[1]) length += summaries[1].length;
  }
  return length;
}

class App extends PureComponent {
  state = {
    terms: [],
    privacies: [],
    termsURL: "",
    privaciesURL: "",
    isLoading: true,
    logo: ""
  };

  async fetchState(url) {
    const results = await fetchSummaries(url);
    chrome.runtime.sendMessage({ badge: getLengthSafe(results[1]) });
    return results;
  }

  async componentDidMount() {
    const url = await getCurrentURL();
    const [
      [termsURL, privaciesURL],
      [terms, privacies]
    ] = await this.fetchState(url);
    this.setState({
      terms,
      privacies,
      privaciesURL,
      termsURL,
      isLoading: false,
      logo: `https://logo.clearbit.com/${url}?size=36`
    });
  }

  render() {
    const {
      isLoading,
      privacies,
      terms,
      logo,
      termsURL,
      privaciesURL
    } = this.state;
    const UI =
      privacies.length > 0 || terms.length > 0 ? (
        <Main
          privacies={privacies}
          terms={terms}
          logo={logo}
          termsURL={termsURL}
          privaciesURL={privaciesURL}
        />
      ) : (
        <EmptyState />
      );
    return isLoading ? <Loading /> : UI;
  }
}

export default hot(module)(App);
