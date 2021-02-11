import { FC, ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { useAuth } from '../hooks';

// Todo: type this correctly
interface PublicRouterTypes {
  component: ElementType;
  restProps: any;
}

const PublicRouter: FC<any> = ({ component: Component, ...restProps }) => {
  const {
    auth: { isLogged }
  } = useAuth();

  return (
    <Route
      {...restProps}
      render={(routeProps: JSX.IntrinsicAttributes) =>
        !isLogged ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRouter;
