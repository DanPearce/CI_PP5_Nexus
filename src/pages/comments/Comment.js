import React from 'react'
import Row from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../components/ProfilePicture'
import styles from '../../styles/Comment.module.css'

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_on, body} = props

  return (
    <Row>
      <Container className={`${styles.Comment}`}>
        <Link to={`/profiles/${profile_id}`}>
          <ProfilePicture 
            src={profile_image}
          />
        </Link>
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Updated}> {updated_on}</span>
          <p className={`mt-1 ${styles.Body}`}>{body}</p>
      </Container>
      <hr/>
    </Row>
  )
}

export default Comment