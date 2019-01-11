import React, { StrictMode } from "react";
import { render } from "react-dom";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import App from "./components/App";
import "uikit/dist/css/uikit.min.css";
import "./popup.css";

UIkit.use(Icons);
window.UIkit = UIkit;

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("app-container")
);
