import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { MovieGrid, Section } from '../../../components';
import api from '../../../services/api';

export const Genre = () => {
  const { state: genre } = useLocation();
  const [movies, setMovies] = useState([]);

  const getMoviesByGenres = async () => {
    try {
      await api.getMoviesByGenres(genre.id).then((response) => {
        setMovies(response.data.results);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMoviesByGenres();
  }, []);

  return (
    <Container
      style={{ backgroundColor: 'white', padding: '0px', height: 'auto' }}
      className="container-movies"
      maxWidth="lg"
    >
      <Section title={genre.name}>
        <MovieGrid itemLIst={movies} />
      </Section>
    </Container>
  );
};
