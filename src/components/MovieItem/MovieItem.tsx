import { FC } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Hidden } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '330px',
    height: '545px',
    margin: '20px',
    borderRadius: '5px',
    overflow: 'hidden',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    backgroundColor: '#ecf0f1',
    cursor: 'pointer'
  },

  img: {
    minWidth: '100%',
    maxWidth: '100%',
    maxHeight: '85%'
  }
});

interface Props {
  poster_path: string;
  title: string;
  rating: number;
  path: string;
}

const MovieItem: FC<Props> = ({ poster_path, title, rating, path }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div
      className={`${classes.root}`}
      onClick={() => {
        history.push(`/${path}`);
      }}
    >
      <img
        src={'https://image.tmdb.org/t/p/w342' + poster_path}
        alt="poster"
        className={classes.img}
      />
      <div>
        <Typography color="textSecondary" variant="h6">
          {title}
        </Typography>
        <Typography color="textSecondary" variant="subtitle1">
          {rating}
        </Typography>
      </div>
    </div>
  );
};

export default MovieItem;
