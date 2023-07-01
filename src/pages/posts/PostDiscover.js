import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import Asset from "../../components/Asset";
import appStyles from "../../styles/App.module.css"
import styles from "../../styles/PostDiscover.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/search-no-results.png";

function PostDiscover({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

  return (
    <Container>
      <Row className="h-100 d-flex justify-content-center">
        <Col lg={6}>
          {hasLoaded ? (
            <>
              {posts.results.length ? (
                posts.results.map((post) => (
                  <Row className={`mb-4 ${styles.Border}`}>
                    <Post key={post.id} {...post} setPosts={setPosts} />
                  </Row>
                ))
              ) : (
                <Container className={appStyles.Body}>
                  <Asset src={NoResults} message={message} />
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