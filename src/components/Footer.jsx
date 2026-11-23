/* Imports */
import React from 'react';
import styles from '../styles/Footer.module.css';

/* Footer with the developer's links, shown on every page */
const Footer = () => (
  <footer className={styles.Footer}>
    <ul className={styles.Socials}>
      <li>
        <a href="https://www.instagram.com/dnlpearce/" target="_blank" rel="noopener noreferrer" aria-label="Visit the developer's Instagram page (opens in a new tab)"><i className="fa-brands fa-instagram"></i></a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/danielanthonypearce/" target="_blank" rel="noopener noreferrer" aria-label="Visit the developer's LinkedIn page (opens in a new tab)"><i className="fa-brands fa-linkedin-in"></i></a>
      </li>
      <li>
        <a href="https://x.com/dnlpearce" target="_blank" rel="noopener noreferrer" aria-label="Visit the developer's X page (opens in a new tab)"><i className="fa-brands fa-x-twitter"></i></a>
      </li>
      <li>
        <a href="https://github.com/DanPearce/CI_PP5_Nexus" target="_blank" rel="noopener noreferrer" aria-label="View the code on the developer's GitHub page (opens in a new tab)"><i className="fa-brands fa-github"></i></a>
      </li>
    </ul>
    <p className={styles.Signature}>COPYRIGHT &copy; 2026 DAN PEARCE</p>
    <p className={styles.Signature}>
      Website developed by Dan Pearce<br />
      <a href="https://danielpearce.co.uk/" target="_blank" rel="noopener noreferrer" aria-label="Visit Dan Pearce's website (opens in a new tab)">danielpearce.co.uk</a>
    </p>
  </footer>
);

export default Footer;
