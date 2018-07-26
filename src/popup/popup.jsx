import React from 'react';
import { render } from 'react-dom';

import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import './popup.css';

import Root from './components/Root';

UIkit.use(Icons);
window.UIkit = UIkit;

render(<Root />, window.document.getElementById('app-container'));
