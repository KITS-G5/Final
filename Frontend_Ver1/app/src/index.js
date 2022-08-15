import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import GlobalStyles from "./Components/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <GlobalStyles>
          <App/>
      </GlobalStyles>
  </React.StrictMode>
);

