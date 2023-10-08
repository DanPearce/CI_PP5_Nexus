/* Imports */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import styles from '../../styles/AuthForm.module.css';
import appStyles from '../../styles/App.module.css';
import btnStyles from '../../styles/Button.module.css';
import profileStyles from '../../styles/Profile.module.css';

function UserPasswordForm() {
  
  const [userData, setUserData] = useState({
    new_password1: '',
    new_password2: '',
  });
  const { new_password1, new_password2, image, owner } = userData;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  /*
    Handles the edit of the password  
  */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        const { image, owner, is_owner } = data;
        is_owner ? setUserData({ image, owner }) : navigate('/');
      } catch(err) {
      //  console.log(err);
      }
    }
    handleMount();
  }, [navigate, id]);

  /*
    Handles the change to the input fields
  */
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  }

  /*
    Handles the password update
    Redirects user to their profile page upon completion
  */
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axiosRes.post(`/dj-rest-auth/password/change/`, userData);
      navigate(`/profiles/${id}`);
    } catch(err) {
    //  console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  }

  return (
    <Container className={`${appStyles.Border} ${styles.Background}`}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6} className={`lg-6`}>
            <Container className={`p-2 mt-4`}>
            <h1 className={`${styles.Heading} mb-3 text-center d-lg-none`}>Change Password</h1>
              <Form.Group className={`text-center`}>
                <figure>
                  <Image 
                    className={`${profileStyles.ProfilePicture} ${appStyles.Border}`}
                    roundedCircle 
                    src={image}
                    alt={`${owner}'s Profile Icon`}
                  />
                </figure>
              </Form.Group>
            </Container>
          </Col>
          <Col lg={5}>
            <Container className={`p-2 mt-4`}>
              <h1 className={`${styles.Heading} mb-3 text-center d-none d-lg-block`}>Change Password</h1>
              
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className=''>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Please enter your new password"
                    name='new_password1'
                    className={styles.PostInput}
                    value={new_password1 || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors?.new_password1?.map((message, index) => (
                  <Alert
                    key={index}
                    variant="warning"
                    className={`${appStyles.Alert} mb-3`}
                  >
                    {message}
                  </Alert>
                ))}
                <Form.Group className="mb-3" controlId="body">
                  <Form.Label className=''>Confirm Password</Form.Label>
                  <Form.Control 
                    type='password'
                    rows={5}
                    placeholder="Confirm your new password"
                    name='new_password2'
                    className={styles.PostInput}
                    value={new_password2 || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors?.new_password2?.map((message, index) => (
                  <Alert
                    key={index}
                    variant="warning"
                    className={`${appStyles.Alert} mb-3`}
                  >
                    {message}
                  </Alert>
                ))}
                <Container className='text-center'>
                  <Button 
                    className={`mb-3 me-5 ${btnStyles.PostButton}`}
                    onClick={() => navigate(-1)}
                  >
                  <i className="fa-solid fa-arrow-left"></i> Go back 
                  </Button>
                  <Button 
                    variant="primary"
                    type="submit"
                    className={`mb-3 ${btnStyles.PostButton}`}
                  >
                    Update
                  </Button>
                </Container>
            </Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UserPasswordForm;