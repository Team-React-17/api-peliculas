import { FC, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  createStyles,
  makeStyles,
  Theme,
  alpha
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useAuth } from '../../hooks';
import { Button, Grid, InputBase } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import api from '../../services/api';
import { useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: 'flex'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
        height: 40
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: '100%',
      position: 'absolute',
      top: 0,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'white',
      height: 'inherit',
      top: '-200%'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: 34,
      transition: theme.transitions.create('width'),
      width: '250px',
      height: 'inherit',
      color: 'white'
    },
    form: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: 34,
      transition: theme.transitions.create('width'),
      width: '250px',
      height: 'inherit'
    },
    genreButton: {
      marginLeft: 30,
      marginRight: 30,
      paddingTop: 20,
      textTransform: 'capitalize'
    }
  })
);

const Header: FC = () => {
  const classes = useStyles();
  const { setAuth } = useAuth();
  const history = useHistory();
  const { path } = useRouteMatch();

  const [genres, setGenres] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openGenreMenu, setOpenGenreMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: any) => {
    if (e.target.id === 'logout') {
      setAuth({ user: {}, isLogged: false });
      history.push('/login');
    }
    setAnchorEl(null);
  };

  const handleGenreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenGenreMenu(event.currentTarget);
  };

  const handleGenreMenuClose = (e: any) => {
    setOpenGenreMenu(null);
  };

  const getGenres = async () => {
    try {
      await api.getGenres().then((response) => {
        setGenres(response.data.genres);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    history.push(`${path}search/${e.target[0].value}`);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          paddingLeft={2}
        >
          <Typography
            component={Link}
            to="/"
            variant="h5"
            style={{ textDecoration: 'none', color: '#fff' }}
          >
            Movies App
          </Typography>
          <Button
            color="inherit"
            onClick={handleGenreMenu}
            endIcon={<ArrowDropDown />}
            className={classes.genreButton}
            style={{ marginLeft: 30, marginTop: 4 }}
          >
            Genres
          </Button>
          <Menu
            id="menu-genres"
            anchorEl={openGenreMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(openGenreMenu)}
            onClose={handleGenreMenuClose}
          >
            {genres.map((genre: any) => (
              <MenuItem
                key={genre.id}
                id={genre.id}
                onClick={() => {
                  history.push(`/genre/${genre.name.toLowerCase()}`, genre);
                  handleGenreMenuClose(null);
                }}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          paddingRight={2}
        >
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={onSubmit} className={classes.form}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                style={{ color: 'white' }}
                inputProps={{ 'aria-label': 'search' }}
                name="search"
                type="search"
              />
            </form>
          </div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            <div>
              <p>adadasd</p>
            </div>
            <MenuItem id="logout" onClick={handleClose}>
              logout
            </MenuItem>
          </Menu>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
