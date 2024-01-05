import { Auth0Provider } from '@auth0/auth0-react';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css";

// Vite React recognizes import.meta.env over process.env; we don't need to import dotenv as vite is smart enough to access env variables:
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain} 
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      audience="https://dateplannerapi.com"
      // scope="openid profile email"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
);
