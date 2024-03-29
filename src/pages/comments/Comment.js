/* Imports */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { DropdownMenu } from '../../components/DropdownMenu';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ProfilePicture from '../../components/ProfilePicture';
import CommentEditForm from './CommentEditForm';
import Row from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Comment.module.css';
import dropdownStyles from '../../styles/DropdownMenu.module.css';

const Comment = (props) => {
  const { 
    profile_id, profile_image, owner, updated_on, body, id, setPost, setComments
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);

  /*
    Handles the deletion of a comment, by id
    decrements comment_count by 1
  */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1
          }
        ]
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id)
      }));
    } catch (err){
    //  console.log(err);
    }
  };

  return (
    <>
      <Row>
        <Container className={`${styles.Comment}`}>
          {is_owner && !showEditForm && (
                <DropdownMenu 
                  className={dropdownStyles.Absolute}
                  handleEdit={() => setShowEditForm(true)} 
                  handleDelete={handleDelete}
                />
          )}
            <Link to={`/profiles/${profile_id}`} className={styles.Owner}>
              <ProfilePicture 
                src={profile_image}
                user={owner}
                
              />
            </Link>
            <span className={styles.Updated}> {updated_on}</span>
            {showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                body={body}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p className={`mt-1 ${styles.Body}`}>{body}</p>
            )}
        </Container>
        <hr/>
      </Row>
    </>
  );
};

export default Comment;