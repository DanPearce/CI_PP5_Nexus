import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"
import styles from '../styles/LandingPage.module.css'
import appStyles from '../styles/App.module.css'
import btnStyles from '../styles/Button.module.css'
import landingImage from '../assets/landing-image.jpg'

const LandingPage = () => {
  return (
    <>
    <Container className={`col-md-8 ${appStyles.Border} ${styles.Background}`}>
      <Row className='p-4 justify-content-md-center'>
        <Col className={`text-center mt-auto mb-auto`}>
          <h1 className={`${styles.Logo}`}>Welcome to Nexus</h1>
          <p className={`${styles.Slogan}`}>Discover, today.</p>
          <p className={`${styles.Info}`}>Nexus is a photo sharing platform, designed to bring focus back to what's important in life.</p>
          <img
            src={landingImage}
            className={`${styles.LandingImage}`}
            alt='Person taking a photograph of live music / event.'
          />
          <p className={`${styles.Info}`}>You won't be bothered with ads or monetiezation here, so why not? Make an account and start sharing today!</p>
          <Row>
            <Col>
              <Link to='signup'>
                <Button
                  className={`mb-3 ${btnStyles.ButtonLanding}`}
                >
                  Sign me up!
                </Button>
              </Link>
            </Col>
            <Col>
            <Link to='signin'>
              <Button
                className={`mb-3 ${btnStyles.ButtonLanding}`}
              >
                Already signed up? Sign in!
              </Button>
            </Link>  
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default LandingPage;