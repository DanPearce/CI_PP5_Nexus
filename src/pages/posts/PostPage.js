import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import appStyles from '../../styles/App.module.css'
import formStyles from '../../styles/AuthForm.module.css'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'
import styles from '../../styles/PostPage.module.css'
import stylesPost from '../../styles/Post.module.css'
import commentFormStyles from '../../styles/CommentCreateForm.module.css'
import authStyles from '../../styles/AuthForm.module.css'
import Post from './Post'
import CommentCreateForm from '../comments/CommentCreateForm'
import Comment from '../comments/Comment'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState({ results: [] })
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: []})

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`)
        ])
        setPost({ results: [post]})
        setComments(comments)
      } catch(err){
        console.log(err)
      }
    }
    handleMount()
  }, [id])
  return (
    <Container className={`${appStyles.Border} ${formStyles.Background}`}>
      <Container>
        <Row className={`text-center ${stylesPost.Post}`}> 
            <Post {...post.results[0]} setPosts={setPost} postPage/>
            <div className={`${commentFormStyles.Relative} col-lg-6 text-left`}>
              <hr className='d-lg-none m'/>
              <h1 className={`${authStyles.Heading} mb-3`}>Comments</h1>
              <div className={styles.Overflow}>
                {comments.results.length ? (
                  comments.results.map((comment) => (
                    <Comment
                      key={comment.id} 
                      {...comment}
                      setPost={setPost}
                      setComments={setComments}
                    />
                  ))
                  ) : currentUser ? (
                    <span>No comments! Add one to share your opinion</span>
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
  )
}

export default PostPage