import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import ProfilePicture from '../../components/ProfilePicture'
import styles from '../../styles/CommentCreateForm.module.css'

function CommentCreateForm(props) {
  const { post, setPost, setComments, profilePicture, profile_id } = props;
  return (
    <Col className={`${styles.Relative}`}>
    <Container>
      <p>Comments</p>
      <Form className={`${styles.Form}`}>
        <Form.Group className='ms-auto me-0'>
          <InputGroup>
          <Link>
            <ProfilePicture
              src={profilePicture}
            />
          </Link>
          <Form.Control 
            className={`${styles.CommentForm}`}
            placeholder='Add a comment..'
            as='textarea'
            rows='2'
          />
          </InputGroup>
        </Form.Group>
        <Button
          className={`${styles.Button} mt-1`}
          type='submit'
        >
          Add Comment
        </Button>
      </Form>
    </Container>
    </Col>
  )
}

export default CommentCreateForm