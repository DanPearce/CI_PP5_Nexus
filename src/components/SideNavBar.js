/* Imports */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Container  from 'react-bootstrap/Container';
import styles from '../styles/SideNavBar.module.css';
import appStyles from '../styles/App.module.css';
import navBarStyles from '../styles/NavBar.module.css';

/*
  SideNavBar displays a NavBar for logged in users
  Allows users to Share Posts
  Allows users to view liked posts
  Allows users to view following posts
*/
const SideNavBar = () => {
  const currentUser = useCurrentUser();

  return (
    <Container className="ps-0 pe-0">
      {currentUser? (
        <>
          <Container className={`${styles.MobileSideNavBar} ${appStyles.Border} ${styles.SideLinks} ps-0 pe-0 d-lg-none `}>
            <NavLink
              className={navBarStyles.NavLink}
              to='/posts/create'
            >
              <i className="fa-regular fa-square-plus"></i> Share
            </NavLink>
            <NavLink
              className={navBarStyles.NavLink}
              to="/liked"
            >
              <i className="fa-solid fa-thumbs-up"></i> Liked
            </NavLink>
            <NavLink
              className={navBarStyles.NavLink}
              to="/"
            >
              <i className="fa-solid fa-user-group"></i> Following
            </NavLink>
          </Container>
            <Container className={`${styles.SideNavBar} ${appStyles.Border} ${styles.SideLinks} d-none d-lg-flex ms-0 me-0`}>
              <NavLink
                className={navBarStyles.NavLink}
                to='/posts/create'
              >
                <i className="fa-regular fa-square-plus"></i> Share
              </NavLink>
              <NavLink
                className={navBarStyles.NavLink}
                to="/liked"
              >
                <i className="fa-solid fa-thumbs-up"></i> Liked
              </NavLink>
              <NavLink
                className={navBarStyles.NavLink}
                to="/"
              >
                <i className="fa-solid fa-user-group"></i> Following
              </NavLink>
            </Container>
            </>
            ) : (
              <Container></Container>
            )}
    </Container>
  )
};

export default SideNavBar;