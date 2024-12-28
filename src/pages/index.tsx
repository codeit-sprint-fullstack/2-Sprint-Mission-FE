import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import HomePage from "./HomePage/HomePage";

const Home = () => {
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HomePage />
    </ThemeProvider>
  </React.StrictMode>;
}

export default Home;