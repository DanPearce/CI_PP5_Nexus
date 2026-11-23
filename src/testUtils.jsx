/* Helpers for the tests: the app wrapped in the same providers as in src/index.jsx, with a router at a given address */
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ProfileDataProvider } from './contexts/ProfileDataContext';

export const renderWithProviders = (ui, { route = '/' } = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <CurrentUserProvider>
        <ProfileDataProvider>{ui}</ProfileDataProvider>
      </CurrentUserProvider>
    </MemoryRouter>
  );

/* An unsigned JSON Web Token, enough for jwt-decode to read the expiry */
export const fakeToken = (exp) => {
  const encode = (value) => btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ exp })}.signature`;
};
