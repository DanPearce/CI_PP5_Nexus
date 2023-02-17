import React from 'react'
import styles from '../styles/ProfilePicture.module.css'

const ProfilePicture = ({ src, px = 30, text }) => {
  return (
    <span>
      <img 
        className={styles.ProfilePicture}
        src={src}
        height={px}
        width={px}
        alt='Profile image'
      />
      {text}
    </span>
  )
}

export default ProfilePicture