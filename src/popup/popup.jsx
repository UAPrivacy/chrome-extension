import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Root from './components/Root';
import ErrorBoundary from './components/ErrorBoundary';
import 'uikit/dist/css/uikit.min.css';
import './popup.css';

UIkit.use(Icons);
window.UIkit = UIkit;

render(
  <StrictMode>
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>
  </StrictMode>,
  window.document.getElementById('app-container')
);
