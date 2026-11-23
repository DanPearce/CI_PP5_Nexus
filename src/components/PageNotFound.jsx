/* Imports */
import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../assets/error-image.png';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import styles from '../styles/AuthForm.module.css';
import appStyles from '../styles/App.module.css';
import sideNavBarStyles from '../styles/SideNavBar.module.css';

/*
  Error / 404 Page
*/
const PageNotFound = () => {

  return (
    <Container className={`col-md-8 text-center ${sideNavBarStyles.SideLinks} ${appStyles.Border} ${styles.Background}`}>
      <Image src={Error} width={150} alt='Image showing the word Error'/>
      <h4 className='pt-0'>This page does not exist!</h4>   
      <Link to='/'>
        <i className="fa-solid fa-house-chimney" />  Go to main page
      </Link>
      <p></p>
    </Container>
  );
};

export default PageNotFound;