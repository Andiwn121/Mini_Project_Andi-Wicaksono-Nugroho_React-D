import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { ThemeConfig } from "./themes/themeConfig";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./config/ApolloClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ConfigProvider theme={ThemeConfig}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </ApolloProvider>
);
