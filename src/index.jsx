/* Imports */
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ProfileDataProvider } from './contexts/ProfileDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <CurrentUserProvider>
      <ProfileDataProvider>
        <App />
      </ProfileDataProvider>
    </CurrentUserProvider>
  </Router>
);
