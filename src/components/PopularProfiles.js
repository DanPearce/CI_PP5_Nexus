/* Imports */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useProfileData } from '../contexts/ProfileDataContext';
import Asset from '../components/Asset';
import Container  from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import styles from '../styles/SideNavBar.module.css';
import appStyles from '../styles/App.module.css';
import navBarStyles from '../styles/NavBar.module.css';

/*
  PopularProfiles component displays the most followed profiles
*/
const PopularProfiles = () => {
  const { popularProfiles } = useProfileData();

  return (
    <Container className="ps-0 pe-0">
      {popularProfiles.results.length ? (
          <Container className="ps-0 pe-0">
              <div className={`${styles.MobilePopularProfiles} ${appStyles.Border} ${styles.SideLinks} ps-0 pe-0 d-lg-none`}>
                <b className="mt-2">Popular Profiles</b>
                {popularProfiles.results.slice(0, 3).map((profile) => (
                  <NavLink
                    className={navBarStyles.NavLink}
                    to={`/profiles/${profile.id}`}
                    key={profile.id}
                  >
                    <p className="mb-0"> 
                      <Image
                      className={`${appStyles.Border} me-2`}
                      roundedCircle
                      src={profile?.image}
                      width={30}
                      />
                      {profile.owner}
                    </p>
                  </NavLink>
                ))}
              </div>
              <div className={`${styles.PopularProfiles} ${appStyles.Border} ${styles.SideLinks} d-none d-lg-block text-center`}>
                <b>Popular Profiles</b>
                {popularProfiles.results.slice(0, 10).map((profile) => (
                  <NavLink
                    className={`${navBarStyles.NavLink}`}
                    to={`/profiles/${profile.id}`}
                    key={profile.id}
                  >
                    <p key={profile.id} className="mb-0 text-start ms-2"> 
                      <Image
                      className={`${appStyles.Border} me-2`}
                      roundedCircle
                      src={profile?.image}
                      width={30}
                      />
                      {profile.owner}
                    </p>
                  </NavLink>
                ))}
              </div>
          </Container>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};


export default PopularProfiles;