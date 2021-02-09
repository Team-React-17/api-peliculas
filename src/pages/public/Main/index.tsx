import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../../../components/Login/Login';
import SignUp from '../../../components/SignUp/SignUp';
import Movies from '../../private/Movies/index';
import './Main.scss';

// Todo: Login and SignUp must be moved to pages

const Main: FC = () => (
  <div className="Main">
    <Router>
      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/api-peliculas" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route exact path="/" component={Login} />
      </Switch>
      {/* <Login /> */}
    </Router>
  </div>
);

export default Main;
