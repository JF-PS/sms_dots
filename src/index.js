import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/store";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <Toaster position="bottom-right" />
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
