/* Imports */
import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/Asset.module.css';

/*
  Utility used for various tasks
  Spinner for loading
  src for images
  message for messages
*/
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation='border'/>}
      {src && <img src={src} alt={message}/>}
      {message && <p className='mt-3'>{message}</p>}
    </div>
  );
};

export default Asset;
