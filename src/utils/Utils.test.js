import { beforeEach, describe, expect, it } from 'vitest';
import { fakeToken } from '../testUtils';
import { removeTokenTimestamp, setTokenTimestamp, shouldRefreshToken } from './Utils';

describe('token timestamp', () => {
  beforeEach(() => localStorage.clear());

  it('is not set before signing in', () => {
    expect(shouldRefreshToken()).toBe(false);
  });

  it('uses the expiry of the refresh token when the API sends one (older versions)', () => {
    setTokenTimestamp({ refresh_token: fakeToken(1893456000) });
    expect(localStorage.getItem('refreshTokenTimestamp')).toBe('1893456000');
    expect(shouldRefreshToken()).toBe(true);
  });

  it('works with the "refresh" field of dj-rest-auth 7 too', () => {
    setTokenTimestamp({ refresh: fakeToken(1893456001) });
    expect(localStorage.getItem('refreshTokenTimestamp')).toBe('1893456001');
  });

  it('still remembers the sign in when the refresh token is only in the HttpOnly cookie (empty "refresh")', () => {
    // regression: this used to make signing in fail, because the page tried to decode an empty token
    setTokenTimestamp({ access: fakeToken(1893456000), refresh: '' });
    expect(shouldRefreshToken()).toBe(true);
    expect(Number(localStorage.getItem('refreshTokenTimestamp'))).toBeGreaterThan(1700000000);
  });

  it('is removed on sign out', () => {
    setTokenTimestamp({ refresh: '' });
    removeTokenTimestamp();
    expect(shouldRefreshToken()).toBe(false);
  });
});
