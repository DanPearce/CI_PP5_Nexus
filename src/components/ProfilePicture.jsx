/* Imports */
import React from 'react'
import styles from '../styles/ProfilePicture.module.css'

/*
  ProfilePicture component
*/
const ProfilePicture = ({ src, px = 30, user }) => {

  return (
    <span>
      <img 
        className={styles.ProfilePicture}
        src={src}
        height={px}
        width={px}
        alt={`${user}'s Profile Icon`}
      />
      {user}
    </span>
  )
}

export default ProfilePicture