import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
// assets
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import App from './components/App';

import './popup.css';

UIkit.use(Icons);
window.UIkit = UIkit;

const Loading = () => (
    <div className="uk-flex uk-flex-center uk-flex-middle" data-uk-height-viewport>
        <span uk-spinner="ratio: 4.5" className="uk-margin-auto-vertical" />
    </div>
);

export default class Popup extends PureComponent {
    state = {
        terms: [],
        privacies: [],
        isLoading: true,
    };

    fetchLocalStorage = () => {
        chrome.runtime.sendMessage({ load: true }, (response) => {
            if (response && response.data) {
                const { data } = response;
                this.setState({
                    terms: data.terms,
                    privacies: data.privacies,
                    isLoading: false,
                });
            } else {
                this.fetchAPI();
            }
        });
    };

    storeLocalStorage(data) {
        chrome.runtime.sendMessage({ store: true, data }, (response) => {
            console.log(response.msg);
        });
    }

    fetchAPI = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then((results) => {
                results = results.data.map(post => post.body).slice(0, 15);

                const data = {
                    terms: results,
                    privacies: results.slice().reverse(),
                };

                const { privacies, terms } = data;
                this.setState({
                    terms: data.terms,
                    privacies: data.privacies,
                    isLoading: false,
                });
                this.storeLocalStorage({ terms, privacies });
            })
            .catch(() => {
                console.error('error fetching clauses');
                this.setState({
                    isLoading: false,
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
                lastFocusedWindow: true,
            },
            (tabs) => {
                const url = tabs[0].url;
                console.log(url);
            },
        );
    }

    render() {
        const { isLoading, privacies, terms } = this.state;
        return isLoading ? <Loading /> : <App privacies={privacies} terms={terms} />;
    }
}

render(<Popup />, window.document.getElementById('app-container'));
