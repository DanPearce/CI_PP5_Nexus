/* Imports */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';
import { fetchMoreData } from '../../utils/Utils';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Post from './Post';
import SideNavBar from '../../components/SideNavBar';
import PopularProfiles from '../../components/PopularProfiles';
import Form from 'react-bootstrap/Form';
import Asset from '../../components/Asset';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from 'react-bootstrap/Container';
import appStyles from '../../styles/App.module.css';
import styles from '../../styles/PostDiscover.module.css';
import NoResults from '../../assets/search-no-results.png';

function PostDiscover({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const currentUser = useCurrentUser();

  /*
    Makes an API request to pull the data for all posts, filtered based on search query
    All posts are loaded, allows us to use 'pathname' to get liked/followed posts
    Calls currentUser to refresh post upon login/logout
  */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
      //  console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Container>
      <PopularProfiles />
      <SideNavBar />
      <Row className="h-100 d-flex justify-content-center">
        <Col lg={6}>
        <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}></i>
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type='text'
            className='mr-sm-2'
            placeholder='Search posts'
          />
        </Form>
          {hasLoaded ? (
            <>
              {posts.results.length ? (
                <InfiniteScroll
                  children={
                    posts.results.map((post) => (
                      <Row className={`mb-4 ${appStyles.Border}`} key={post.id}>
                        <Post {...post} setPosts={setPosts}/>
                      </Row>
                  ))}
                  dataLength={posts.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!posts.next}
                  next={() => fetchMoreData(posts, setPosts)}
                  className={styles.InfiniteScroll}
                />
              ) : (
                <Container className={appStyles.Body}>
                  <Link to={'/discover'} className={styles.Link}>
                    <Asset src={NoResults} message={message} className={styles.Link}/>
                  </Link>
                </Container>
              )}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PostDiscover;