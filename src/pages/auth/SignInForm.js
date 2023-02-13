import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import styles from '../../styles/AuthForm.module.css'
import app from '../../styles/App.module.css'

function SignInForm() {
  return (
    <Container className={`col-md-8 ${app.Border} ${styles.Background}`}>
      <Row className='p-4 justify-content-md-center'>
        <Col className={`text-center ${styles.Logo}`}>
          <h1>Nexus</h1>
        </Col>
        <Col className='text-center mx-auto'>
          <Container>
            <h1 className={styles.Heading}>Sign In</h1>
          </Container>
          <Container>
            Don't have an account? &nbsp;
            <Link>
              Sign up!
            </Link>
          </Container>
        </Col>
      </Row>
    </Container>

  )
}

export default SignInForm