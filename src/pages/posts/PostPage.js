import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import appStyles from '../../styles/App.module.css'
import formStyles from '../../styles/AuthForm.module.css'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'
import stylesPost from '../../styles/Post.module.css'
import Post from './Post'
import CommentCreateForm from '../comments/CommentCreateForm'
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
        const [{ data: post },] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ])
        setPost({ results: [post]})
        console.log(post)
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
            <hr className='d-lg-none m'/>
            {currentUser ? (
              <CommentCreateForm 
              profile_id={currentUser.profile_id}
              profilePicture={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
            ) : comments.results.length ? (
              'Comments'
            ) : null
            }
        </Row>
      </Container>
    </Container>
  )
}

export default PostPage