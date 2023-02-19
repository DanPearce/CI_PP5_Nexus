import React from "react";
import styles from "../../styles/Post.module.css";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Image from 'react-bootstrap/Image'
import Popover from "react-bootstrap/Popover";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import ProfilePicture from "../../components/ProfilePicture";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    body,
    image,
    updated_on,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const url = getCurrentURL()
  function getCurrentURL() {
    return window.location.href
  }

  return (
    <Container className={styles.Post}>
      <Row>
        <Col lg={5}>
          <Container className={`d-flex mt-1 justify-content-between ${styles.PostBio}`}>
            <Link to={`/profiles/${profile_id}`} className={styles.PostLink}>
              <ProfilePicture src={profile_image} height={60} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>{updated_on}&nbsp;</span>
              {is_owner && postPage && " Edit..."}
            </div>
          </Container>
          <Container>
            <Link to={`/posts/${id}`} className={styles.PostLink}>
              {title && <h4>{title}</h4>}
              <Image src={image} alt={title} className={styles.PostImage} />
            </Link>
          </Container>
          <Container className='d-flex justify-content-between'>
            <div className={`${styles.PostBar} mt-1 mb-1`}>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={() => {}}>
                  <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={() => {}}>
                  <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              )}
              &nbsp;{likes_count}&nbsp;&nbsp;
              <Link to={`/posts/${id}`} className={styles.PostLink}>
                <i className="far fa-comments" />
              </Link>
              &nbsp;{comments_count}
            </div>
            <OverlayTrigger
              trigger='click'
              placement='left'
              overlay={
                <Popover className={styles.SharePopover}>
                  URL Copied to clipboard!
                </Popover>
              }
              rootClose
            >
              <div onClick={() => {navigator.clipboard.writeText(url);}}>
                <i class="fa-regular fa-share-from-square"></i>
              </div>
            </OverlayTrigger>
          </Container>
          <Container>
            <div className={`${styles.PostBody}`}>
              {body && <p>{body}</p>}
            </div>
          </Container>
        </Col>
        {/* Code for comments - to be added later*/}
        <hr className="d-lg-none"/>
        <Col>
          <Container className='d-flex justify-content-between'>
            <p>Comments</p>
            <div>
              <Link to={`/posts/${id}`} className={styles.PostLink}>
                <i className="far fa-comments" />
              </Link>
              &nbsp;{comments_count}          
            </div>
          </Container>   
        </Col>
      </Row>
    </Container>
  );
};

export default Post;