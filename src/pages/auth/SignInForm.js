import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../styles/AuthForm.module.css'
import appStyles from '../../styles/App.module.css'
import btnStyles from '../../styles/Button.module.css'
import axios from 'axios'

function SignInForm() {
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  })
  const {username, password} = signInData

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/dj-rest-auth/login/', signInData)
      navigate('/')
    } catch(err){
      console.log(err)
    }
  }
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    })
  }
  
  return (
    <Container className={`col-md-8 ${appStyles.Border} ${styles.Background}`}>
      <Row className='p-4 justify-content-md-center'>
        <Col className={`text-center mt-auto mb-auto ${styles.Logo}`}>
          <h1>Nexus</h1>
        </Col>
        <Col className='text-center mx-auto'>
          <Container>
            <h1 className={`${styles.Heading} mb-3`}>Sign In</h1>
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

              <Form.Group className="mb-4" controlId="password">
                <Form.Label className='d-none'>Password</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="Password"
                  name='password'
                  className={styles.Input}
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button 
                variant="primary"
                type="submit"
                className={`mb-3 ${btnStyles.Button}`}
              >
                Sign In
              </Button>
            </Form>
          </Container>
          <Container className={styles.LinkContainer}>
            Don't have an account? &nbsp;
            <Link className={styles.Link} to='/signup'>
              Sign up!
            </Link>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default SignInForm