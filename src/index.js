import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProviderComponent } from "./ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <ThemeProviderComponent>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProviderComponent>,
  document.getElementById("root")
);
