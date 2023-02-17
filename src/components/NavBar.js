import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';

const NavBar = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/')
      setCurrentUser(null)
    } catch(err) {
      console.log(err)
    }
  }

  const loggedInNavBar = (
    <>
      <NavLink to='/' className={styles.NavLink}>
        <i className="fa-solid fa-square-h"></i> Home
      </NavLink>
      <NavLink to='/discover' className={styles.NavLink}>
        <i className="fa-solid fa-magnifying-glass"></i> Discover
      </NavLink>
      <NavLink to='/profile' className={styles.NavLink}>
        <i className="fa-solid fa-house-user"></i> {currentUser?.username}
      </NavLink>
      <NavLink to='/' className={styles.NavLink} onClick={handleSignOut}>
        <i className="fa-solid fa-xmark"></i> Sign Out
      </NavLink>
    </>
  )

  const loggedOutNavBar = (
    <>
      <NavLink to='/signup' className={styles.NavLink}>
        <i className="fa-solid fa-plus"></i> Sign Up
      </NavLink>
      <NavLink to='/signin' className={styles.NavLink}>
        <i className="fa-solid fa-check"></i> Sign In
      </NavLink>
      <NavLink to='/' className={styles.NavLink}>
        <i className="fa-solid fa-square-h"></i> Home
      </NavLink>
    </>
  )
  return (
    <Navbar expand="lg" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to='/' className={styles.NavLink}>
          <Navbar.Brand className={styles.Logo}>Nexus</Navbar.Brand>
        </NavLink>
        <Navbar.Text className={styles.NavBarText}>
          Discover, today.
        </Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-start">
            {currentUser ? loggedInNavBar : loggedOutNavBar}
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  )
}

export default NavBar