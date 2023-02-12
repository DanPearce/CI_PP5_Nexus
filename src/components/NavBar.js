import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar expand="lg" fixed="top" className={styles.NavBar}>
      <Container>
        <Navbar.Brand href="#home" className={styles.Logo}>Nexus</Navbar.Brand>
        <Navbar.Text className={styles.NavBarText}>
          Discover, today.
        </Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-start">
            <Nav.Link href="#link"><i class="fa-solid fa-plus"></i> Sign Up </Nav.Link>
            <Nav.Link href="#link"><i class="fa-solid fa-check"></i> Sign In</Nav.Link>
            <Nav.Link href="#home"><i class="fa-solid fa-square-h"></i> Home</Nav.Link>
            <Nav.Link href="#link"><i class="fa-solid fa-magnifying-glass"></i> Discover</Nav.Link>
            <Nav.Link href="#link"><i class="fa-solid fa-house-user"></i> Profile</Nav.Link>
            <Nav.Link href="#link"><i class="fa-solid fa-xmark"></i> Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  )
}

export default NavBar