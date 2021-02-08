import React, { FunctionComponent } from 'react';
import { Container, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  divider: {
    marginBottom: 20
  }
});

interface OwnProps {
  title: string;
}

type Props = OwnProps;

export const Section: FunctionComponent<Props> = ({ children, title }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="h4">{title}</Typography>
      <Divider className={classes.divider} />
      {children}
    </Container>
  );
};
