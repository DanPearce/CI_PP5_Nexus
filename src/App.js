import styles from './styles/App.module.css'
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import PostHome from './pages/posts/PostHome';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Profile from './pages/profiles/Profile';
import PostDiscover from './pages/posts/PostDiscover';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostEditForm from './pages/posts/PostEditForm'
import LandingPage from './components/LandingPage';
import { useCurrentUser } from './contexts/CurrentUserContext'
import './api/axiosDefaults'

function App() {
  const currentUser = useCurrentUser()
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
          </Routes>
        ) : (
          <Routes>
          <Route exact path='/' element={<PostHome />}/>
          <Route exact path='/signin' element={<SignInForm />}/>
          <Route exact path='/signup' element={<SignUpForm />}/>
          <Route exact path='/discover' element={<PostDiscover />}/>
          <Route exact path='/profile' element={<Profile />}/>
          <Route exact path='/posts/create' element={<PostCreateForm />}/>
          <Route exact path='posts/:id' element={<PostPage />} />
          <Route exact path='posts/:id/edit' element={<PostEditForm />} />
        </Routes>
        )}
      </Container>
    </div>
  );
}

export default App;
