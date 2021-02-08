import { FC, useCallback, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Search from '../../../components/Search/Search';
import Carousel from '../../../components/Carousel/Carousel';
import { MovieGrid, Section } from '../../../components';
import api from '../../../services/api';

const Movies: FC = () => {
  const [movies, setMovies] = useState<any>([]);

  const getLatestMovies = useCallback(async () => {
    try {
      await api.getLatestMovies().then((response: any) => {
        setMovies(response.data.results);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getLatestMovies();
  }, [])

  return (
    <Container
      style={{ backgroundColor: 'white', padding: '0px', height: 'auto' }}
      className="container-movies"
      maxWidth="lg"
    >
      <Search />
      <Carousel />
      <Section title="Latest Movies">
        <MovieGrid itemLIst={movies} />
      </Section>
    </Container>
  );
};

export default Movies;
