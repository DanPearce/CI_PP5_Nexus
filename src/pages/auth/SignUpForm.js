/* Imports */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import landingImage from '../../assets/landing-image.jpg';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from '../../styles/AuthForm.module.css';
import appStyles from '../../styles/App.module.css';
import btnStyles from '../../styles/Button.module.css';

function SignUpForm() {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const { username, password1, password2 } = signUpData;
  const navigate = useNavigate();

  /*
    Handles changes made to the input fields
  */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    });
  };

  /*
    Handles the form submission
    Redirects after successfully signing up
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      navigate('/signin');
    } catch(err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container className={`col-md-8 ${appStyles.Border} ${styles.Background}`}>
      <Row className='p-4 justify-content-md-center'>
        <Col xxl={6} className={`text-center mt-auto mb-auto`}>
          <h1 className={`${styles.Logo}`}>Nexus</h1>
          <p className={`${styles.Slogan}`}>Discover, today.</p>
          <img
            src={landingImage}
            className={`${styles.LandingImage}`}
            alt='Person taking a photograph of live music / event.'
          />
        </Col>
        <Col xxl={6} className='text-center mx-auto'>
          <Container>
            <h1 className={`${styles.Heading} mb-3 mt-5`}>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label className='d-none'>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name='username'
                  className={styles.Input}
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, index) => 
                <Alert
                key={index} 
                variant="warning"
                className={`${appStyles.Alert} mb-3`}
              >
                {message}
              </Alert>
              )}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="Password"
                  name='password1'
                  className={styles.Input}
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password1?.map((message, index) => 
                <Alert
                key={index} 
                variant="warning"
                className={`${appStyles.Alert} mb-3`}
              >
                {message}
              </Alert>
              )}
              <Form.Group className="mb-4" controlId="password2">
                <Form.Label className='d-none'>Confrim password</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="Confirm password"
                  name='password2'
                  className={styles.Input}
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2?.map((message, index) => 
                <Alert
                key={index} 
                variant="warning"
                className={`${appStyles.Alert} mb-3`}
              >
                {message}
              </Alert>
              )}
              <Button 
                variant="primary"
                type="submit"
                className={`mb-3 ${btnStyles.Button}`}
              >
                Sign Up
              </Button>
              {errors.non_field_errors?.map((message, index) => 
                <Alert
                key={index} 
                variant="warning"
                className={`${appStyles.Alert} mb-3`}
              >
                {message}
              </Alert>
              )}
            </Form>
          </Container>
          <Container className={styles.LinkContainer}>
            Already have an account? &nbsp;
            <Link className={styles.Link} to='/signin'>
              Sign in!
            </Link>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;