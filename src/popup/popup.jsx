import App from "./components/App";
import React from "react";
import { render } from "react-dom";
// assets
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);
window.UIkit = UIkit;

import "./popup.css";
import logo from "../assets/logo.png";
import favicon from "../assets/favicon.png";

render(<App />, window.document.getElementById("app-container"));
