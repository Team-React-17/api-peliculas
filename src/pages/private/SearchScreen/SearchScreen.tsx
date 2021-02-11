import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { MovieGrid, Section } from '../../../components';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

export const SearchScreen = () => {
  const { textSearch } = useParams();
  const [movies, setMovies] = useState([]);

  const getSearch = async () => {
    try {
      await api.getSearch(textSearch).then((response) => {
        setMovies(response.data.results);
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(textSearch);

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <Container
      style={{
        backgroundColor: 'white',
        padding: '0px',
        height: 'auto',
        marginTop: -20
      }}
      className="container-movies"
      maxWidth="lg"
    >
      <Section title={`Results found: ${textSearch}`}>
        <MovieGrid itemLIst={movies} />
      </Section>
    </Container>
  );
};
