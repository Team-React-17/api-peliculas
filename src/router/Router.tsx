import { Switch, Redirect } from 'react-router-dom';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import SignUp from '../components/SignUp/SignUp';
import Login from '../components/Login/Login';
import Movies from '../pages/private/Movies';

const Router = () => (
  <div>
    <Switch>
      <PublicRouter path="/login" component={Login} />
      <PublicRouter path="/sign-up" component={SignUp} />

      <PrivateRouter path="/" exact component={Movies} />

      <Redirect from="*" to="/" />
    </Switch>
  </div>
);

export default Router;
