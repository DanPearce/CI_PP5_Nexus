/* Imports */
import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link, useNavigate } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { DropdownMenu } from '../../components/DropdownMenu';
import ProfilePicture from '../../components/ProfilePicture';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/Image';
import Popover from 'react-bootstrap/Popover';
import styles from '../../styles/Post.module.css';

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
    setPosts,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();
  const url = getCurrentURL();
  function getCurrentURL() {
    return window.location.href;
  };

  /*
    Navigates users to the Edit Post page
  */
  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };
  
  /*
    Handles the deltion of the post
    Redirects user to the previous pafe
  */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}`);
      navigate(-1);
    } catch (err) {
    //  console.log(err);
    };
  };

  /*
    Handles the liking of a post
    Increments likes_count by 1
  */
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
          ? { 
              ...post, 
              likes_count: post.likes_count + 1, 
              like_id: data.id
        }
          : post;
        })
      }));
    } catch(err) {
    //  console.log(err);
    };
  };

  /*
    Handles the unliking of a post
    Decreases likes_count by 1
  */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
          ? { ...post, likes_count:
          post.likes_count - 1, like_id: null }
          : post;
        })
      }));
    } catch(err) {
    //  console.log(err);
    };
  };

  return (
    <Col className="p-0">
    <Container className={`d-flex mt-1 justify-content-between ${styles.PostBio}`}>
      <Link to={`/profiles/${profile_id}`} className={styles.PostLink}>
        <ProfilePicture src={profile_image} height={60} />
        {owner}
      </Link>
      <div className="d-flex align-items-center">
        <span>{updated_on}&nbsp;</span>
        {is_owner && postPage && (
          <DropdownMenu
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </Container>
    <Container className="p-0">
      <Link to={`/posts/${id}`} className={styles.PostLink}>
        {title && <h4 className="text-center">{title}</h4>}
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
          <span onClick={handleUnlike}>
            <i className={`fas fa-heart ${styles.Heart}`} />
          </span>
        ) : currentUser ? (
          <span onClick={handleLike}>
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
        <div onClick={() => {navigator.clipboard.writeText(url)}}>
          <i className="fa-regular fa-share-from-square"></i>
        </div>
      </OverlayTrigger>
    </Container>
    <Container>
      <div className={`${styles.PostBody}`}>
        {body && <p>{body}</p>}
      </div>
    </Container>
    </Col>
  );
};

export default Post;