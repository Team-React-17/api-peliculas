import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../../../components/Login/Login';
import Movies from '../../private/Movies/index';
import './Main.scss';

const Main: FC = () => (
  <div className="Main">
    <Router>
      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/api-peliculas" component={Login} />
        <Route exact path="/" component={Login} />
      </Switch>
      {/* <Login /> */}
    </Router>
  </div>
);

export default Main;
