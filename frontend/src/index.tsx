import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./style/GlobalStyle";
import { theme } from "./style/Theme";
import { Provider } from "react-redux";
import { store } from "./store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { BrowserRouter } from "react-router-dom";
import AlertTemplate from "./components/AlertTemplate";
// import "@atlaskit/css-reset";

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <App />
          </AlertProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
