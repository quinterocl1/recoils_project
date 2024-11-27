import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProviderComponent } from "./ThemeContext";
import { AuthProvider } from "./context/AuthContext"; // Importa AuthProvider
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <ThemeProviderComponent>
    <AuthProvider> {/* Envolver la aplicación con AuthProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProviderComponent>,
  document.getElementById("root")
);
