/* Imports */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
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

function ProfileEditForm() {
  
  const [profileData, setProfileData] = useState({
    name: '',
    about: '',
    image: ''
  });

  const { name, about, image, owner } = profileData;
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  /*
    Handles edit of user information
    Sends a request to the API based on the owner id
  */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        const { name, about, image, owner, is_owner } = data;
        is_owner ? setProfileData({ name, about, image, owner }) : navigate('/');
      } catch(err) {
      //  console.log(err);
      }
    }
    handleMount();
  }, [navigate, id]);
  
  /*
    Handles changes made to the input fields
  */
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value
    });
  };

  /*
    Handles changes made to the image input fields
  */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  
  /*
    Handles the form submisson
    Redirects the user to their page
  */
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('name', name);
    formData.append('about', about);

    if (imageInput?.current?.files[0]){
      formData.append('image', imageInput.current.files[0]);
    }
    try {
      await axiosReq.put(`/profiles/${id}`, formData)
      navigate(`/profiles/${id}`)
    } catch(err) {
    //  console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container className={`${appStyles.Border} ${styles.Background}`}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6} className={`lg-6`}>
            <Container className={`p-2 mt-4`}>
            <h1 className={`${styles.Heading} mb-3 text-center d-lg-none`}>Edit Profile</h1>
              <Form.Group className={`text-center`}>
                <figure>
                  <Image 
                    className={`${profileStyles.ProfilePicture} ${appStyles.Border}`}
                    roundedCircle 
                    src={image}
                    alt={`${owner}'s Profile Icon`}
                  />
                </figure>
                <Form.Control
                  type='file'
                  id='image-upload'
                  accept='image/*'
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              {errors?.image?.map((message, index) => (
                  <Alert
                    key={index}
                    variant="warning"
                    className={`${appStyles.Alert} mb-3`}
                  >
                    {message}
                  </Alert>
                ))}
            </Container>
          </Col>
          <Col lg={5}>
            <Container className={`p-2 mt-4`}>
              <h1 className={`${styles.Heading} mb-3 text-center d-none d-lg-block`}>Edit Profile</h1>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className=''>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Change your Display Name"
                    name='name'
                    className={styles.PostInput}
                    value={name}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors?.name?.map((message, index) => (
                  <Alert
                    key={index}
                    variant="warning"
                    className={`${appStyles.Alert} mb-3`}
                  >
                    {message}
                  </Alert>
                ))}
                <Form.Group className="mb-3" controlId="body">
                  <Form.Label className=''>About Me</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={5}
                    placeholder="Add a about me section "
                    name='about'
                    className={styles.PostInput}
                    value={about}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors?.about?.map((message, index) => (
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
}

export default ProfileEditForm;