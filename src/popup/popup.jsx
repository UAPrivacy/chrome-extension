import Greeting from "./app";
import React from "react";
import { render } from "react-dom";
// assets
import "./popup.css";
import logo from "../assets/logo.png";
import favicon from "../assets/favicon.png";

render(<Greeting />, window.document.getElementById("app-container"));
