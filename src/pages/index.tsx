import React from "react";
import ReactDOM from "react-dom/client";
import App from "./_app";
import "./styles/global.css";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";

<React.StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
</React.StrictMode>;
