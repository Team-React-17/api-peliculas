import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import SignUpHook from '../../hooks/SignUp/signup';
import { db } from '../../environment/environment';
import './SignUp.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: 'auto'
      }
    },
    inputs: {
      paddingBottom: 53,
      '& > *': {
        margin: theme.spacing(2)
      }
    },
    message: {
      marginTop: -25,
      marginBottom: 25,
      justifyContent: 'center',
      height: '100'
    },
    anchor: {
      textDecoration: 'none',
      color: '#3F51B5'
    },
    field: {
      margin: '10px'
    }
  })
);

const regUsername = /^[a-zA-Z0-9]+$/;
const regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const minLength = 8;

const SignUp: FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { setAuth } = useAuth();

  const { error, setError, msg, setMsg } = SignUpHook();

  const onChange = (e: any) => {
    const val = e.target.value;
    switch (e.target.id) {
      case 'username':
        const usernameValidation = !regUsername.test(val);
        setError({ ...error, username: usernameValidation });
        break;
      case 'email':
        const emailValidation = !regEmail.test(val);
        setError({ ...error, email: emailValidation });
        break;
      case 'password':
        const passwordValidation = val.length < minLength;
        setError({ ...error, password: passwordValidation });
        break;
    }
  };

  const getUser = async (username: string, email: string) => {
    const usernameEndpoint = `${db.HOST_API}/${db.PATH_USER}?username=${username}`;
    const usernameRequest = await fetch(usernameEndpoint);
    const usernameResponse = await usernameRequest.json();

    if (usernameResponse.length > 0) {
      return true;
    }

    const emailEndpoint = `${db.HOST_API}/${db.PATH_USER}?email=${email}`;
    const emailRequest = await fetch(emailEndpoint);
    const emailResponse = await emailRequest.json();

    if (emailResponse.length > 0) {
      return true;
    }

    return false;
  };

  const createUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    const isUserExist = await getUser(username, email);

    if (isUserExist) {
      setMsg('Already exists a user with the same username or email.');
      return;
    }

    const userData = {
      username,
      email,
      password
    };

    const postUserEndpoint = `${db.HOST_API}/${db.PATH_USER}?username=${username}`;
    const postUserRequest = await fetch(postUserEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const postUserResponse = await postUserRequest.json();

    if (!postUserResponse) {
      setMsg('Something went wrong, please try again later.');
      return;
    }
    setMsg('');
    // @ts-ignore
    delete postUserRequest.password;
    setAuth({ user: postUserRequest, isLogged: true });
    history.replace('/');
  };

  const onSumbit = (e: any) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirm = e.target[3].value;
    if (!username || !email || !password || !confirm) {
      setMsg('Please check all required data.');
      return;
    }
    if (error.username) {
      setMsg('Please enter a valid username.');
      return;
    }
    if (error.email) {
      setMsg('Please enter a valid email.');
      return;
    }
    if (error.password) {
      setMsg('Please enter a valid password.');
      return;
    }
    if (password !== confirm) {
      setMsg('Please check the passwords, they do not match.');
      return;
    }
    setMsg('');
    createUser(username, email, password);
  };

  return (
    <div className="signup-container">
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
                Sign Up
              </Typography>
              <TextField
                className={classes.field}
                error={error.username}
                type="input"
                id="username"
                variant="standard"
                label="Nombre de usuario"
                onChange={onChange}
              />
              <TextField
                className={classes.field}
                error={error.email}
                type="input"
                id="email"
                variant="standard"
                label="Correo Electrónico"
                onChange={onChange}
              />
              <TextField
                className={classes.field}
                error={error.password}
                type="password"
                id="password"
                variant="standard"
                label="Clave"
                onChange={onChange}
              />
              <TextField
                className={classes.field}
                error={error.password}
                type="password"
                id="confirm"
                variant="standard"
                label="Confirmar Clave"
                onChange={onChange}
              />
              <Button
                className="buttons-form"
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <br />
              <p className="text-info">Do you already have an account?</p>
              <Button
                className="buttons-form"
                variant="outlined"
                color="primary"
                onClick={() => history.push('/')}
              >
                <Link to="/" className={classes.anchor}>
                  Sign In
                </Link>
              </Button>
            </form>
            {msg !== '' && (
              <Alert severity="error" className={classes.message}>
                {msg}
              </Alert>
            )}
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default SignUp;
