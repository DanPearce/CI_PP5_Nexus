import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Asset from '../../components/Asset';
import styles from '../../styles/Profile.module.css';
import appStyles from '../../styles/App.module.css';
import btnStyles from '../../styles/Button.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import { useProfileData, useSetProfileData} from '../../contexts/ProfileDataContext'
import { Button, Image } from 'react-bootstrap';


function Profile() {
  const [hasLoaded, setHasLoaded] = useState(false)


  const currentUser = useCurrentUser()
  const { id } = useParams()

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData()
  const { pageProfile } = useProfileData()

  const [profile] = pageProfile.results
  const is_owner = currentUser?.username === profile?.owner

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ])
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }))
        setHasLoaded(true)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [id, setProfileData])

  const Profile = (
    <>
    <Row>
        <Col xs={4} className='text-align-left'>
          <Image
            className={styles.ProfilePicture}
            roundedCircle
            src={profile?.image}
        />
        </Col>
        <Col xs={8} className='mt-3'>
          <Row className='mb-1'>
            <Col xs={7} className='d-none d-md-flex'>
              <h4 >{profile?.owner}</h4>
            </Col>
            <Col xs={7} className='d-md-none g-0'>
              <h4>{profile?.owner}</h4>
            </Col>
            <Col className='d-none d-md-flex'>
              {currentUser &&
                !is_owner &&
                (profile?.following_id ? (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                    onClick={() => handleUnfollow(profile)}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Black}`}
                    onClick={() => handleFollow(profile)}
                  >
                    Follow
                  </Button>
                ))}
            </Col>
            <Row className='d-md-none w-auto'>
              {currentUser &&
                !is_owner &&
                (profile?.following_id ? (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                    onClick={() => handleUnfollow(profile)}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Black}`}
                    onClick={() => handleFollow(profile)}
                  >
                    Follow
                  </Button>
                ))}
            </Row>
            <hr className='d-none d-md-flex mt-3'/>
          </Row>
          <Row className='d-none d-md-flex'>
            <Col xs={3}>
              <div>{profile?.posts_count} Posts</div>
            </Col>
            <Col xs={4}>
              <div>{profile?.followers_count} Followers</div>
            </Col>
            <Col xs={4}>
              <div>{profile?.following_count} Following</div>
            </Col>
          </Row>
        </Col>
        
        {profile?.content && <Col className='p-3'>{profile.content}</Col>}
      </Row>
      <Row className='d-md-none text-center justify-content-center'>
        <hr className='mt-3' />
          <Row>
            <Col xs={4}>
              <div>{profile?.posts_count}</div>
              <div>Posts</div>
            </Col>
            <Col xs={4}>
              <div>{profile?.followers_count}</div>
              <div>Followers</div>
            </Col>
            <Col xs={4}>
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
      </Row>
    </>
  )

  return (
    <Row className={`d-flex justify-content-center ${appStyles.Border}`}>
      <Col lg={12}>
        <Container className='mt-3 mb-3'>
          {hasLoaded ? (
            <>
              {Profile}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  )
}

export default Profile