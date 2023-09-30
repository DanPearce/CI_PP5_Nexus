import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
import Post from "./Post";
import Asset from "../../components/Asset";
import appStyles from "../../styles/App.module.css"
import styles from "../../styles/PostDiscover.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/search-no-results.png";
import { Link } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/Utils";
import PopularProfiles from "../../components/PopularProfiles";
import SideNavBar from "../../components/SideNavBar";

function PostDiscover({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    },1500)
    return () => {
      clearTimeout(timer)
    }
  }, [filter, query, pathname]);

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
}

export default PostDiscover;