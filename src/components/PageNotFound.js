import React from 'react'
import Error from '../assets/error-image.png'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import styles from '../styles/AuthForm.module.css'
import appStyles from '../styles/App.module.css'
import sideNavBarStyles from '../styles/SideNavBar.module.css'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
  return (
    <Container className={`col-md-8 text-center ${sideNavBarStyles.SideLinks} ${appStyles.Border} ${styles.Background}`}>
      <Image src={Error} width={150}/>
      <h4 className='pt-0'>This page doesn't exist!</h4>   
      <Link to='/'>
        <i class="fa-solid fa-house-chimney" />  Go to main page
      </Link>
      <p></p>
    </Container>
  )
}

export default PageNotFound