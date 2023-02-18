import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import appStyles from '../../styles/App.module.css'
import formStyles from '../../styles/AuthForm.module.css'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'

function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState({ results: [] })

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
      <Row>
        <Col className={`text-center`}>
          <p>Test</p>
        </Col>
      </Row>
    </Container>
  )
}

export default PostPage