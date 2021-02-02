import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import LoginHook from '../../hooks/Login/login';
import { db } from '../../environment/environment';
import './Login.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(50)
      }
    },
    inputs: {
      '& > *': {
        margin: theme.spacing(2)
      }
    }
  })
);

const regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const MinLength = 8;

const Login: FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const { error, setError, msg, setMsg } = LoginHook();

  const onChange = (e: any) => {
    const val = e.target.value;
    if (e.target.id === 'email') {
      const emailValdation = !regEmail.test(val);
      setError({ ...error, email: emailValdation });
    } else {
      const passwordValidation = val.length < MinLength;
      setError({ ...error, password: passwordValidation });
    }
  };

  const validateCredentials = async (email: string, password: string) => {
    const endpoint = `${db.HOST_API}/${db.PATH_USER}?email=${email}&password=${password}`;
    const request = await fetch(endpoint);
    const response = await request.json();
    if (response.length === 0) {
      setMsg('Incorrect credentials.');
      return;
    }
    setMsg('');
    history.replace('/movies');
  };
  const onSumbit = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (email === '' || password === '') {
      setMsg('You must to put your credentials.');
      return;
    }
    if (error.email || error.password) {
      setMsg('email or password is invalid.');
      return;
    }
    setMsg('');
    validateCredentials(email, password);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={5}>
        <div>
          <form
            className={classes.inputs}
            noValidate
            autoComplete="off"
            onSubmit={onSumbit}
          >
            <Typography className="title" variant="h6">
              Login
            </Typography>
            <TextField
              error={error.email}
              type="input"
              id="email"
              variant="standard"
              label="correo"
              onChange={onChange}
            />
            <TextField
              error={error.password}
              type="input"
              id="password"
              variant="standard"
              label="password"
              onChange={onChange}
            />
            <Button
              className="buttons-form"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <br />
            <Button className="buttons-form" variant="outlined" color="primary">
              Sign Up
            </Button>
            {msg !== '' && <Alert severity="error">{msg}</Alert>}
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
