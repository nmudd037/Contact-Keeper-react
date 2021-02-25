import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // we just need the auth state without dispatch.
  const authState = useAuth()[0];
  const { isAuthenticated, loading } = authState;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
