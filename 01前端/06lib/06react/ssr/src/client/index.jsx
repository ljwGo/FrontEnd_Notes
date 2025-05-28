import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App'
import AboutPropsProvider from "../provider/AboutPropsProvider";

const root = document.getElementById('root');
const dataTextArea = document.getElementById('ssr-hydrate-data');
hydrateRoot(root,
  <BrowserRouter>
    <AboutPropsProvider value={JSON.parse(dataTextArea.value)}>
      <App />
    </AboutPropsProvider>
  </BrowserRouter>
)