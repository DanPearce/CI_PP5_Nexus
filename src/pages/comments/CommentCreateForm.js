/* Imports */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import ProfilePicture from '../../components/ProfilePicture';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/CommentCreateForm.module.css';

function CommentCreateForm(props) {
  const { post, setPost, setComments, profilePicture, profile_id } = props;
  const [body, setBody] = useState('');
  const handleChange = (event) => {
    setBody(event.target.value);
  };

  /*
    Handles the form submisson
    Updates comment, including date
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        body,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setBody("");
    } catch (err) {
    //  console.log(err.response);
    }
  };

  return (
  <Container>
    <Form className={`${styles.Form} mt-1`} onSubmit={handleSubmit}>
      <Form.Group className='ms-auto me-0'>
        <InputGroup>
        <Link to={`profiles/${profile_id}`}>
          <ProfilePicture
            src={profilePicture}
          />
        </Link>
        <Form.Control 
          className={`${styles.CommentForm}`}
          placeholder='Add a comment..'
          as='textarea'
          rows={2} 
          value={body}
          onChange={handleChange}
        />
        </InputGroup>
      </Form.Group>
      <Button
        className={`${styles.Button} mt-2`}
        type='submit'
      >
        Add Comment
      </Button>
    </Form>
  </Container>
  )
}

export default CommentCreateForm