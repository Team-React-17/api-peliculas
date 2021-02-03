import { FC, useEffect, useState } from 'react';
import Hooks from '../../hooks/Carousel/Carousel';
import { db } from '../../environment/environment';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative'
  },
  arrows: {
    color: 'black'
  },
  button: {
    position: 'absolute',
    top: '50%',
    display: 'block',
    left: '15%'
  }
});

const Carousel: FC = () => {
  const classes = useStyles();
  const { index, setIndex, movies, setMovies } = Hooks();
  const [imagesEndpoint] = useState('https://image.tmdb.org/t/p/w780');

  useEffect(() => {
    const request = async () => {
      const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${db.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
      const request = await fetch(endpoint);
      const data = await request.json();

      return data;
    };

    const movies_data: Array<any> = [];

    request().then((data) => {
      for (let i = 0; i < 5; i++) {
        movies_data.push(data.results[i]);
      }

      setMovies(movies_data);
    });
  }, [setMovies]);

  return (
    <div className={classes.root}>
      <Typography
        color="primary"
        variant="h3"
        style={{ margin: 25, marginTop: 50 }}
      >
        Featured
      </Typography>
      <div>
        <IconButton
          onClick={() => {
            if (index === 0) return;
            setIndex(index - 1);
          }}
          className={classes.button}
          style={{ left: '15%' }}
        >
          <ArrowBackIosIcon fontSize="large" className={classes.arrows} />
        </IconButton>

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

        <IconButton
          onClick={() => {
            if (index === 4) return;
            setIndex(index + 1);
          }}
          className={classes.button}
          style={{ left: '80.5%' }}
        >
          <ArrowForwardIosIcon fontSize="large" className={classes.arrows} />
        </IconButton>
      </div>
    </div>
  );
};

export default Carousel;
