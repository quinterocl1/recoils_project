import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProviderComponent } from "./ThemeContext";
import { BrowserRouter} from 'react-router-dom';
ReactDOM.render(
  <ThemeProviderComponent>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </ThemeProviderComponent>,
  document.getElementById("root")
);
