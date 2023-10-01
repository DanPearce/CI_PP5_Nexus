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

function PostEditForm() {
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    image: ''
  });
  const { title, body, image } = postData;
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  /*
    Makes an API request to pull the data from the post ID
    Prevents making changes to data that isn't owned by the user
    Redirects if user does not own data
  */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { title, body, image, is_owner } = data;
        is_owner ? setPostData({ title, body, image }) : navigate('/');
      } catch(err) {
      //  console.log(err);
      };
    };
    handleMount();
  }, [navigate, id]);
  
  /*
    Handles changes made to the input fields
  */
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    });
  };

  /*
    Handles changes made to the image input field
  */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    };
  };

  /*
    Handles the form submission
    Redirects user back to the post upon completion
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);

    if (imageInput?.current?.files[0]){
      formData.append('image', imageInput.current.files[0]);
    };
    try {
      await axiosReq.put(`/posts/${id}`, formData);
      navigate(`/posts/${id}`);
    } catch(err) {
    //  console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      };
    };
  };

  return (
    <Container className={`${appStyles.Border} ${styles.Background}`}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6} className={`lg-6`}>
            <Container className={`p-2 mt-4`}>
            <h1 className={`${styles.Heading} mb-3 text-center d-lg-none`}>Edit Post</h1>
              <Form.Group className={`text-center`}>
                <figure>
                  <Image className={`${appStyles.Image}`} src={image} />
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
                ))};
            </Container>
          </Col>
          <Col lg={5}>
            <Container className={`p-2 mt-4`}>
              <h1 className={`${styles.Heading} mb-3 text-center d-none d-lg-block`}>Edit Post</h1>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className=''>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add a title"
                    name='title'
                    className={styles.PostInput}
                    value={title}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors?.title?.map((message, index) => (
                  <Alert
                    key={index}
                    variant="warning"
                    className={`${appStyles.Alert} mb-3`}
                  >
                    {message}
                  </Alert>
                ))};
                <Form.Group className="mb-3" controlId="body">
                  <Form.Label className=''>Caption</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={5}
                    placeholder="Add a caption"
                    name='body'
                    className={styles.PostInput}
                    value={body}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors?.body?.map((message, index) => (
                  <Alert
                    key={index}
                    variant="warning"
                    className={`${appStyles.Alert} mb-3`}
                  >
                    {message}
                  </Alert>
                ))};
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

export default PostEditForm;