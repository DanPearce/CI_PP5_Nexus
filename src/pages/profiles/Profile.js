/* Imports */
import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import { fetchMoreData } from '../../utils/Utils';
import { ProfileEditDropdown } from '../../components/DropdownMenu';
import { useProfileData, useSetProfileData} from '../../contexts/ProfileDataContext';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import styles from '../../styles/Profile.module.css';
import appStyles from '../../styles/App.module.css';
import btnStyles from '../../styles/Button.module.css';
import postStyles from '../../styles/Post.module.css';
import dropdownStyles from '../../styles/DropdownMenu.module.css';
import sideNavBarStyles from '../../styles/SideNavBar.module.css';
import NoResults from '../../assets/search-no-results.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProfilePost from './ProfilePost';
import Asset from '../../components/Asset';

function Profile() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  /*
    Makes an API request to pull the data from the users profile and their posts
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts}] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
      //  console.log(err);
      };
    };
    fetchData()
  }, [id, setProfileData]);

  /*
    Renders the Users Profile Header
  */
  const ProfileHeader = (
    <>
    <Row>
        <Col xs={4} className='text-align-left'>
          <Image
            className={`${styles.ProfilePicture} ${appStyles.Border}`}
            roundedCircle
            src={profile?.image}
        />
        </Col>
        <Col xs={8} className='mt-3'>
          <Row className='mb-1'>
            <Col xs={7} className='d-none d-md-flex'>
              <h4>{profile?.name}</h4>
              <h6>({profile?.owner})</h6>
            </Col>
            <Col xs={7} className='d-md-none g-0'>
              <h4>{profile?.name}</h4>
              <h6>({profile?.owner})</h6>
            </Col>
            <Col className='d-none d-md-flex justify-content-end'>
              {/* Renders Follow/Unfollow Button to users who can follow other users, prevents following their own profile */}
              {profile?.is_owner && <ProfileEditDropdown id={profile?.id} className={dropdownStyles.DropdownItem} />};
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
                ))};
            </Col>
            <Row className='d-md-none w-auto justify-content-end'>
              {profile?.is_owner && <ProfileEditDropdown id={profile?.id} className={dropdownStyles.DropdownItem} />};
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
                ))};
            </Row>
            <p className='d-md-none ps-0'>{profile?.about}</p>
            <p className='d-none d-md-flex'>{profile?.about}</p>
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
  );

  /*
    Renders the Users Profile Posts
  */
  const ProfilePosts = (
    <>
    {profilePosts.results.length ? (
      <InfiniteScroll
        children={profilePosts.results.map((post) => (
          <ProfilePost key={post.id} {...post} setPosts={setProfilePosts}/>
        ))}
        dataLength={profilePosts.results.length}
        loader={<Asset spinner />}
        hasMore={!!profilePosts.next}
        next={() => fetchMoreData(profilePosts, setProfilePosts)}
        className={`mt-3 ${styles.Post} d-flex flex-wrap`}
    />
    
    ) : (
      <Asset
        src={NoResults}
        message={`${profile?.owner} has not got any posts.`}
      />
    )};
    </>
  );

  return (
    <Row className={`d-flex justify-content-center`}>
      <Col lg={12}>
        <Container className='mt-3 mb-3'>
          {hasLoaded ? (
            <>
              <Container>
                {ProfileHeader}
              </Container>
              <Container className={`${postStyles.Gallery} d-flex`}>
                {ProfilePosts}
              </Container>
            </>
          ) : (
            <>
              <Asset spinner />
              <Container className={`${sideNavBarStyles.SideLinks} text-center`}>
              <Link to='/'>
                <i class="fa-solid fa-house-chimney" />  Go to main page
              </Link>
              </Container>
            </>
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default Profile;