import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
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
            <NavLink to='/signup' className={styles.NavLink}>
              <i className="fa-solid fa-plus"></i> Sign Up
            </NavLink>
            <NavLink to='/signin' className={styles.NavLink}>
              <i className="fa-solid fa-check"></i> Sign In
            </NavLink>
            <NavLink to='/' className={styles.NavLink}>
              <i className="fa-solid fa-square-h"></i> Home
            </NavLink>
            <NavLink to='/discover' className={styles.NavLink}>
              <i className="fa-solid fa-magnifying-glass"></i> Discover
            </NavLink>
            <NavLink to='/profile' className={styles.NavLink}>
              <i className="fa-solid fa-house-user"></i> Profile
            </NavLink>
            <NavLink to='/' className={styles.NavLink}>
              <i className="fa-solid fa-xmark"></i> Sign Out
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  )
}

export default NavBar