import styles from './styles/App.module.css'
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Body}>
        <h1>Hello</h1>
      </Container>
    </div>
  );
}

export default App;
