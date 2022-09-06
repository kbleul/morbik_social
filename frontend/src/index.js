import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import App from './App';

import  AuthContextProvider  from "./contex/authContext"
import Newuser_ContextProvider from "./contex/newSignupContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider >
        <Newuser_ContextProvider>
          <App />
        </Newuser_ContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
