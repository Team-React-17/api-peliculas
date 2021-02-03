import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: 200,
      textAlign: 'center'
    }
  }
}));

const Styles = {
  text: {
    width: '80%',
    borderRadius: '10px'
  }
};

const Search = () => {
  const classes = useStyles();
  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{ textAlign: 'center' }}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        type="input"
        id="search"
        label="Search..."
        variant="standard"
        style={Styles.text}
        onChange={onChange}
      />
    </form>
  );
};

export default Search;
