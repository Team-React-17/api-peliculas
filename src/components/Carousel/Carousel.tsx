import { FC, useEffect, useState } from 'react';
import Hooks from '../../hooks/Carousel/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import api from '../../services/api';

const useStyles = makeStyles({
  arrows: {
    color: 'black'
  }
});

const Carousel: FC = () => {
  const classes = useStyles();
  const { index, setIndex, movies, setMovies } = Hooks();
  const [imagesEndpoint] = useState('https://image.tmdb.org/t/p/w780');

  const getUpcomingMovies = async () => {
    try {
      await api.getUpcomingMovies().then((response) => {
        setMovies(response.data.results.slice(0, 5));
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  return (
    <Container style={{ display: 'inline' }}>
      <Grid container justifyContent="center" alignItems="center" spacing={5}>
        <Grid item>
          <IconButton
            onClick={() => {
              if (index === 0) return;
              setIndex(index - 1);
            }}
          >
            <ArrowBackIosIcon fontSize="large" className={classes.arrows} />
          </IconButton>
        </Grid>
        <Grid item>
          <a href={movies.length === 0 ? '/' : '/' + movies[index].id}>
            <img
              src={
                movies.length === 0
                  ? undefined
                  : imagesEndpoint + movies[index].backdrop_path
              }
              alt="poster"
            />
          </a>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => {
              if (index === 4) return;
              setIndex(index + 1);
            }}
          >
            <ArrowForwardIosIcon fontSize="large" className={classes.arrows} />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Carousel;
