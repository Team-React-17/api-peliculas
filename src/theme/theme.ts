import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions: ThemeOptions | any = {
  palette: {
    type: 'dark',
    primary: {
      main: '#22223b',
      light: 'rgb(23, 23, 41)'
    },
    secondary: {
      main: '#4a4e69'
    },
    background: {
      default: 'rgb(23, 23, 41)',
      paper: '#dee2e6'
    },
    text: {
      primary: '#4a4e69',
      secondary: '#c1c4de',
      disabled: '#8b8ea6',
      hint: '#b8bbd6'
    }
  }
};

export const theme = createMuiTheme(themeOptions);
