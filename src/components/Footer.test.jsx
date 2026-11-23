import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('shows the copyright year and the developer links', () => {
    render(<Footer />);
    expect(screen.getByText(/COPYRIGHT/)).toHaveTextContent('2026');
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining([
      'https://www.instagram.com/dnlpearce/',
      'https://www.linkedin.com/in/danielanthonypearce/',
      'https://x.com/dnlpearce',
      'https://danielpearce.co.uk/',
    ]));
    expect(hrefs.join(' ')).not.toContain('danpearce.software');
  });

  it('opens its links in a new tab safely', () => {
    render(<Footer />);
    screen.getAllByRole('link').forEach((a) => {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a.getAttribute('rel')).toContain('noopener');
    });
  });
});
