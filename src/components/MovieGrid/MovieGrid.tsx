import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import MovieItem from '../MovieItem/MovieItem';

interface OwnProps {
  itemLIst: any[];
}

type Props = OwnProps;

export const MovieGrid: FunctionComponent<Props> = ({ itemLIst }) => (
  <Grid container justifyContent="center">
    {itemLIst.map((movie) => {
      const { id, title, vote_average, poster_path } = movie;

      return (
        <MovieItem
          key={`movie-${id}`}
          title={title}
          path={`detail/${id}`}
          poster_path={poster_path}
          rating={vote_average}
        />
      );
    })}
  </Grid>
);
