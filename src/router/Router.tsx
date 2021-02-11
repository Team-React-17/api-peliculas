import { Switch, Redirect } from 'react-router-dom';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import SignUp from '../components/SignUp/SignUp';
import Login from '../components/Login/Login';
import Movies from '../pages/private/Movies';
import { Genre } from '../pages/private';
import { SearchScreen } from '../pages/private/SearchScreen/SearchScreen';

const Router = () => (
  <Switch>
    <PublicRouter path="/login" component={Login} />
    <PublicRouter path="/sign-up" component={SignUp} />

    <PrivateRouter path="/genre/:genreName" component={Genre} />
    <PrivateRouter path="/search/:textSearch" component={SearchScreen} />
    <PrivateRouter path="/" exact component={Movies} />

    <Redirect from="*" to="/" />
  </Switch>
);

export default Router;
