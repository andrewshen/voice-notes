import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ component: Component, ...data }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...data}
      render={(props) => {
        if (isAuthenticated) {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PublicRoute;
