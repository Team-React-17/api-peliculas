import { ElementType, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Header from '../components/Header/Header';
import { useAuth } from '../hooks';

// Todo: type this correctly
interface PrivateRouterTypes {
  component: ElementType;
  restProps: any;
}

const PrivateRouter: FC<any> = ({ component: Component, ...restProps }) => {
  const {
    auth: { isLogged }
  } = useAuth();

  return (
    <>
      <Header />
      <Route
        {...restProps}
        component={(routeProps: JSX.IntrinsicAttributes) =>
          isLogged ? <Component {...routeProps} /> : <Redirect to="/login" />
        }
      />
    </>
  );
};

export default PrivateRouter;
