import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import ProfilePicture from './ProfilePicture';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()
  const { expanded, setExpanded, ref} = useClickOutsideToggle()
  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/')
      setCurrentUser(null)
    } catch(err) {
      console.log(err)
    }
  }

  const loggedInNavText = (
    <>
      <NavLink
        className={styles.NavLink}
        to='/posts/create'
      >
        <i className="fa-regular fa-square-plus"></i> Share
      </NavLink>
    </>
  )

  const loggedOutNavText = (
    <>
      <Navbar.Text className={styles.NavBarText}>
        Discover, today.
      </Navbar.Text>
    </>
  )

  const loggedInNavBar = (
    <>
      <NavLink to='/' className={styles.NavLink}>
        <i className="fa-solid fa-square-h"></i> Home
      </NavLink>
      <NavLink to='/discover' className={styles.NavLink}>
        <i className="fa-solid fa-magnifying-glass"></i> Discover
      </NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}`} className={styles.NavLink}>
        <ProfilePicture src={currentUser?.profile_image} user={currentUser?.username} height={25} /> 
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
      <NavLink to='/discover' className={styles.NavLink}>
        <i className="fa-solid fa-magnifying-glass"></i> Discover
      </NavLink>
    </>
  )
  return (
    <Navbar 
      expand="lg"
      fixed="top"
      className={styles.NavBar}
      expanded={expanded}
    >
      <Container>
        <NavLink to='/' className={styles.NavLink}>
          <Navbar.Brand className={styles.Logo}>Nexus</Navbar.Brand>
        </NavLink>
          {currentUser ? loggedInNavText : loggedOutNavText}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={`navbar-dark`}
          ref={ref}
          onClick={() => setExpanded(!expanded)}
        />
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