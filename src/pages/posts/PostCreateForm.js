import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/AuthForm.module.css'
import appStyles from '../../styles/App.module.css'
import btnStyles from '../../styles/Button.module.css'
import Upload from '../../assets/upload.png'
import Asset from '../../components/Asset'
import { Image } from 'react-bootstrap'

function PostCreateForm() {
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    image: ''
  })
  const { title, body, image } = postData
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    })
  }
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
      <Container className={`${appStyles.Border} ${styles.Background}`}>
        <Form>
          <Row>
            <Col lg={6} className={`lg-6`}>
              <Container className={`p-2 mt-4`}>
              <h1 className={`${styles.Heading} mb-3 text-center d-lg-none`}>Share a Post</h1>
                <Form.Group className={`text-center`}>
                  {image ? (
                    <>
                      <figure>
                        <Image className={`${appStyles.Image}`} src={image} rounded />
                      </figure>
                    </>
                  ) : (
                  <Form.Label
                    className={`d-flex justify-content-center`}
                    htmlFor='image-upload'
                  >
                    <Asset
                      src={Upload}
                      message="Tap the image or 'choose file' to upload an image"
                    />
                  </Form.Label>
                  )}

                  <Form.Control
                    type='file'
                    id='image-upload'
                    accept='image/*'
                    onChange={handleChangeImage}
                  />
                </Form.Group>
              </Container>
            </Col>
            <Col lg={5}>
              <Container className={`p-2 mt-4`}>
                <h1 className={`${styles.Heading} mb-3 text-center d-none d-lg-block`}>Share a Post</h1>
                
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

                  <Form.Group className="mb-3" controlId="caption">
                    <Form.Label className=''>Caption</Form.Label>
                    <Form.Control 
                      as="textarea"
                      rows={5}
                      placeholder="Add a caption"
                      name='caption'
                      className={styles.PostInput}
                      value={body}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Container className='text-center'>
                    <Button 
                      variant="primary"
                      type="submit"
                      className={`mb-3 ${btnStyles.PostButton}`}
                    >
                    <i className="fa-solid fa-arrow-left"></i> Go back 
                    </Button>
                    <Button 
                      variant="primary"
                      type="submit"
                      className={`mb-3 ms-5 ${btnStyles.PostButton}`}
                    >
                      Share
                    </Button>
                  </Container>
              </Container>
            </Col>
          </Row>
        </Form>
      </Container>
  )
}

export default PostCreateForm