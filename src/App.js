import styles from './styles/App.module.css'
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Profile from './pages/profiles/Profile';
import PostDiscover from './pages/posts/PostDiscover';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostEditForm from './pages/posts/PostEditForm'
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import LandingPage from './components/LandingPage';
import { useCurrentUser } from './contexts/CurrentUserContext'
import './api/axiosDefaults'

function App() {
  const currentUser = useCurrentUser()
  const profile_id = currentUser?.profile_id || ""

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Body}>
        {!currentUser ? (
          <Routes>
            <Route exact path='/' element={<LandingPage />}/>
            <Route exact path='/signin' element={<SignInForm />}/>
            <Route exact path='/signup' element={<SignUpForm />}/>
            <Route exact path='/discover' element={<PostDiscover />}/>
            <Route exact path='posts/:id' element={<PostPage />} />
            <Route exact path='/profiles/:id' element={<Profile />}/>
          </Routes>
        ) : (
          <Routes>
          <Route
            exact path='/'
            element={
              <PostDiscover 
                message="Try searching for another phrase or follow some more users to add content to your Home page."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            }
          />
          <Route
            exact path="/liked"
            element={
              <PostDiscover
                message="Hmm, nothing here! Try searching for another phrase or you must like a post first."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_on&`}
              />
            }
          />
          <Route exact path='/signin' element={<SignInForm />}/>
          <Route exact path='/signup' element={<SignUpForm />}/>
          <Route
            exact path='/discover'
            element={
              <PostDiscover
                message='No posts matching your query! Try searching for another phrase.'
              />
            }
          />
          <Route exact path='/profiles/:id' element={<Profile />}/>
          <Route exact path='/posts/create' element={<PostCreateForm />}/>
          <Route exact path='posts/:id' element={<PostPage />} />
          <Route exact path='posts/:id/edit' element={<PostEditForm />} />
          <Route exact path='/profiles/:id/edit' element={<ProfileEditForm />}/>

        </Routes>
        )}
      </Container>
    </div>
  );
}

export default App;
