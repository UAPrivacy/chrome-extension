import App from "./components/App";
import React from "react";
import { render } from "react-dom";
// assets
import "./popup.css";
import logo from "../assets/logo.png";
import favicon from "../assets/favicon.png";

render(<App />, window.document.getElementById("app-container"));
