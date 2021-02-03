import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Header from '../../../components/Header/Header';
import Search from '../../../components/Search/Search';

const Movies: FC = () => {
  const history = useHistory();
  if (
    !localStorage.getItem('isLogin') ||
    localStorage.getItem('isLogin') === 'false'
  ) {
    history.replace('/');
  }
  return (
    <Container
      style={{ backgroundColor: 'white', padding: '0px', height: '100vh' }}
      className="container-movies"
      maxWidth="lg"
    >
      <Header />
      <Search />
    </Container>
  );
};

export default Movies;
