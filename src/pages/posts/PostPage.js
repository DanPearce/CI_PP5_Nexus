/* Imports */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { fetchMoreData } from '../../utils/Utils';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import CommentCreateForm from '../comments/CommentCreateForm';
import Comment from '../comments/Comment';
import Asset from '../../components/Asset';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import appStyles from '../../styles/App.module.css';
import formStyles from '../../styles/AuthForm.module.css';
import styles from '../../styles/PostPage.module.css';
import stylesPost from '../../styles/Post.module.css';
import commentFormStyles from '../../styles/CommentCreateForm.module.css';
import authStyles from '../../styles/AuthForm.module.css';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: []});
  const navigate = useNavigate();

  /*
    Makes an API request to pull the data for all posts & comments
    Data is pulled each time there is a URL change
    Routes to 404 if content is not found
  */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`)
        ]);
        setPost({ results: [post]});
        setComments(comments);
      } catch(err){
        navigate('404');
      };
    };
    handleMount();
  }, [id]);

  return (
    <Container className={`${appStyles.Border} ${formStyles.Background}`}>
      <Container>
        <Row className={`text-center ${stylesPost.Post}`}> 
            <Post {...post.results[0]} setPosts={setPost} postPage/>
            <div className={`${commentFormStyles.Relative} col-lg-6 text-left`}>
              <hr className='d-lg-none m'/>
              <h1 className={`${authStyles.Heading} mb-3`}>Comments</h1>
              <div className={styles.Overflow} id='scrollableDiv'>
                {comments.results.length ? (
                  // InfiniteScroll pulls more data as the user scrolls
                  <InfiniteScroll
                    children={
                      comments.results.map((comment) => (
                        <Comment
                          key={comment.id} 
                          {...comment}
                          setPost={setPost}
                          setComments={setComments}
                        />
                      ))
                    }
                    dataLength={comments.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!comments.next}
                    next={() => fetchMoreData(comments, setComments)}
                    scrollableTarget='scrollableDiv'
                  />
                  ) : currentUser ? (
                    <span>No comments! Add one to share your opinion.</span>
                  ) : (
                    <span>No comments! You must be logged into to add a comment!</span>
                  )
                }
              </div>
              {currentUser ? (
                <CommentCreateForm 
                profile_id={currentUser.profile_id}
                profilePicture={profile_image}
                post={id}
                setPost={setPost}
                setComments={setComments}
              />
              ) : null
              }
          </div>
        </Row>
      </Container>
    </Container>
  );
};

export default PostPage;