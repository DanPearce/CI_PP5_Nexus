import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { axiosReq, axiosRes } from './api/axiosDefaults';
import { renderWithProviders, fakeToken } from './testUtils';

// No network in the tests: the API client modules are replaced by mocks
vi.mock('axios');
vi.mock('./api/axiosDefaults', () => {
  const client = () => ({
    get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn(),
    interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
  });
  return { axiosReq: client(), axiosRes: client() };
});

const signedOut = () => axiosRes.get.mockRejectedValue({ response: { status: 401 } });
const signedIn = (user = { pk: 1, username: 'alice', profile_id: 7, profile_image: 'https://example.com/a.png' }) =>
  axiosRes.get.mockResolvedValue({ data: user });

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  axiosReq.get.mockResolvedValue({ data: { results: [], next: null, count: 0 } });
  signedOut();
});

describe('visitors who are not signed in', () => {
  it('see the landing page with sign up and sign in', async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText('Welcome to Nexus')).toBeInTheDocument();
    expect(screen.getByText('Sign me up!')).toBeInTheDocument();
    expect(screen.getByText('Already signed up? Sign in!')).toBeInTheDocument();
  });

  it('see the footer on every page', async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText(/COPYRIGHT/)).toHaveTextContent('2026');
  });

  it('get a not-found page for an address that does not exist', async () => {
    renderWithProviders(<App />, { route: '/no-such-page' });
    await waitFor(() => expect(screen.queryByText('Welcome to Nexus')).not.toBeInTheDocument());
  });
});

describe('a signed-in user', () => {
  it('sees their name and Sign Out', async () => {
    signedIn();
    renderWithProviders(<App />);
    expect(await screen.findByText('Sign Out')).toBeInTheDocument();
    expect(screen.getAllByText('alice').length).toBeGreaterThan(0);
  });

  it('can sign out', async () => {
    signedIn();
    axios.post.mockResolvedValue({});
    renderWithProviders(<App />);
    await userEvent.click(await screen.findByText('Sign Out'));
    expect(axios.post).toHaveBeenCalledWith('dj-rest-auth/logout/');
    expect(await screen.findByText('Sign In')).toBeInTheDocument();
  });
});

describe('signing in', () => {
  const PASSWORD = crypto.randomUUID();

  const fillAndSubmit = async () => {
    await userEvent.type(await screen.findByPlaceholderText('Username'), 'alice');
    await userEvent.type(screen.getByPlaceholderText('Password'), PASSWORD);
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
  };

  it('works with the response of the current API (empty "refresh", the token is in a cookie)', async () => {
    // regression: the app used to read data.refresh_token, which no longer exists
    axios.post.mockResolvedValue({
      data: { access: fakeToken(1893456000), refresh: '', user: { pk: 1, username: 'alice', profile_id: 7, profile_image: '' } },
    });
    renderWithProviders(<App />, { route: '/signin' });
    await fillAndSubmit();
    expect(axios.post).toHaveBeenCalledWith('/dj-rest-auth/login/', { username: 'alice', password: PASSWORD });
    expect(await screen.findByText('Sign Out')).toBeInTheDocument();
    expect(localStorage.getItem('refreshTokenTimestamp')).not.toBeNull();
  });

  it('shows the API error and stays on the page when the details are wrong', async () => {
    axios.post.mockRejectedValue({
      response: { data: { non_field_errors: ['Unable to log in with provided credentials.'] } },
    });
    renderWithProviders(<App />, { route: '/signin' });
    await fillAndSubmit();
    expect(await screen.findByText('Unable to log in with provided credentials.')).toBeInTheDocument();
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
    expect(localStorage.getItem('refreshTokenTimestamp')).toBeNull();
  });
});
